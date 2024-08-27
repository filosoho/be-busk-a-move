const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");
const { checkIfBuskExists } = require("../models/utils.models");
const endpointData = require("../endpoints.json");

beforeAll(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("/api", () => {
  describe("GET", () => {
    test("GET:200 responds with a json representation of all available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body: { endpoints } }) => {
          expect(endpoints).toEqual(endpointData);
        });
    });
  });

  describe("*", () => {
    test("GET 404: /api/nonexistent-route returns 404 - Not Found: Endpoint does not exist", () => {
      return request(app)
        .get("/api/nonexistent-route")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("404 - Not Found: Endpoint does not exist");
        });
    });
  });
});

describe("GET /api/busks", () => {
  it("GET 200: should respond with a 200 status code and return an array of busks to the client", () => {
    return request(app)
      .get("/api/busks")
      .expect(200)
      .then((response) => {
        const busks = response.body.busks;
        expect(busks.length).toBeGreaterThanOrEqual(0);
        expect(Array.isArray(busks)).toBe(true);
        busks.forEach((busk) => {
          expect(busk).toHaveProperty("busk_id");
          expect(busk.busk_id).toBeNumber();
          expect(busk).toHaveProperty("busk_location");
          expect(busk.busk_location).toBeObject();
          expect(busk).toHaveProperty("busk_location_name");
          expect(busk.busk_location_name).toBeString();
          expect(busk).toHaveProperty("busk_time_date");
          expect(busk.busk_time_date).toBeString();
          expect(busk).toHaveProperty("username");
          expect(busk.username).toBeString();
          expect(busk).toHaveProperty("user_image_url");
          expect(busk.user_image_url).toBeString();
          expect(busk).toHaveProperty("busk_about_me");
          expect(busk.busk_about_me).toBeString();
          expect(busk).toHaveProperty("busk_setup");
          expect(busk.busk_setup).toBeString();
          expect(busk).toHaveProperty("busk_selected_instruments");
          expect(Array.isArray(busk.busk_selected_instruments)).toBe(true);
        });
      });
  });
  describe("GET Queries", () => {
    it("?sort_by= 200: should respond with all busk objects ordered by the column of the given 'sort_by' query", () => {
      return request(app)
        .get("/api/busks?sort_by=busk_time_date")
        .expect(200)
        .then(({ body }) => {
          expect(body.busks).toHaveLength(4);
          expect(body.busks).toBeSortedBy("busk_time_date", {
            descending: true,
          });
        });
    });
    it("?sort_by= 400: should respond with a 'Bad request' when the given column name doesn't exist in the table", () => {
      return request(app)
        .get("/api/busks?sort_by=not-a-column")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Bad request" });
        });
    });
    it("?order= 200: should respond with all busk objects ordered by the given 'order' query", () => {
      return request(app)
        .get("/api/busks?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.busks).toHaveLength(4);
          expect(body.busks).toBeSortedBy("busk_time_date", {
            ascending: true,
          });
        });
    });
    it("?order= 400: should respond with 'Bad request' when the 'order' query is anything apart from 'asc' or 'desc'", () => {
      return request(app)
        .get("/api/busks?order=not-an-order")
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Bad request" });
        });
    });
    it("?sort_by=&order= 200: should respond with all busks in the given order, sorted by the given sort_by query", () => {
      return request(app)
        .get("/api/busks?sort_by=username&order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.busks).toHaveLength(4);
          expect(body.busks).toBeSortedBy("username", { ascending: true });
        });
    });
    it("?instruments= 200: should respond with only the busks that have the one selected instrument associated with it", () => {
      return request(app)
        .get("/api/busks?instruments=Vocals")
        .expect(200)
        .then(({ body }) => {
          expect(body.busks).toHaveLength(2);
          body.busks.forEach((busk) => {
            expect(busk.busk_selected_instruments).toContain("Vocals");
          });
        });
    });
  });
});

describe("POST /api/busks", () => {
  it("should respond with a 201 status code and add a busk to the database", () => {
    const newBusk = {
      busk_location: { latitude: 40.7128, longitude: -74.006 },
      busk_location_name: "Central Park",
      busk_time_date: "2024-08-20T23:45:00.000Z",
      username: "Demond_Walter",
      user_image_url: "http://example.com/image.jpg",
      busk_about_me: "Looking for musicians!",
      busk_setup: "Guitar and vocals",
      busk_selected_instruments: [
        "Synthesizer",
        "Guitar",
        "Bass Guitar",
        "Saxophone",
      ],
    };

    return request(app)
      .post("/api/busks")
      .send(newBusk)
      .expect(201)
      .then((response) => {
        expect(response.body.busk).toEqual({
          busk_location: { latitude: 40.7128, longitude: -74.006 },
          busk_location_name: "Central Park",
          busk_time_date: "2024-08-20T23:45:00.000Z",
          busk_id: expect.any(Number),
          username: "Demond_Walter",
          user_image_url: "http://example.com/image.jpg",
          busk_about_me: "Looking for musicians!",
          busk_setup: "Guitar and vocals",
          busk_selected_instruments: [
            "Synthesizer",
            "Guitar",
            "Bass Guitar",
            "Saxophone",
          ],
        });
      });
  });
});

describe("GET /api/busks/:busk_id", () => {
  test("GET 200: should return the specified busk object", () => {
    return request(app)
      .get("/api/busks/2")
      .expect(200)
      .then(({ body }) => {
        const expectedBusk = {
          busk_location: {
            latitude: -4.2768,
            longitude: 168.4704,
          },
          busk_location_name: "Southaven",
          busk_id: 2,
          busk_time_date: "2024-08-14T23:00:00.000Z",
          username: "Lilian_Padberg35",
          user_image_url: "https://avatars.githubusercontent.com/u/50587032",
          busk_about_me:
            "Aperte absum universe illo placeat pecto tolero. Statua tardus defleo victus bellum adipisci commodi officia. Ancilla terreo consequuntur comedo coerceo fuga socius nihil tubineus.",
          busk_setup:
            "Tametsi velum thermae carus vulpes voluntarius maxime civis.",
          busk_selected_instruments: ["Piano", "Vocals"],
        };
        expect(body.busk).toEqual(expectedBusk);
      });
  });
  test("GET 400: should return error when requested with wrong data type", () => {
    return request(app)
      .get("/api/busks/not_a_number")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("GET 404: should return error when requested with an id that doesn't exist", () => {
    return request(app)
      .get("/api/busks/9000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Busk does not exist");
      });
  });
});

describe("DELETE /api/busks/:busk_id", () => {
  test("204: should remove the busk selected by id from the database table", () => {
    return request(app)
      .delete("/api/busks/2")
      .expect(204)
      .then(() => {
        return checkIfBuskExists(2).then((result) => {
          expect(result).toBe(false);
        });
      });
  });
  test("404: should return an error message when busk_id does not exist in the database", () => {
    return request(app)
      .delete("/api/busks/999999")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Busk not found");
      });
  });
  test("400: should return an error message when busk_id is not a number", () => {
    return request(app)
      .delete("/api/busks/NaN")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad request");
      });
  });
});

describe("/api/users", () => {
  describe("GET", () => {
    test("GET 200, responds with an array of all users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          body.users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              full_name: expect.any(String),
              user_email: expect.any(String),
              user_password: expect.any(String),
              user_image_url: expect.any(String),
              user_location: expect.any(String),
              user_about_me: expect.any(String),
            });
          });
        });
    });
  });
});

describe("/api/users/:user_id", () => {
  describe("GET", () => {
    test("GET 200, responds with a user when requested with user_id", () => {
      return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).toMatchObject({
            username: "Olaf.Legros5",
            full_name: "Loretta Jones",
            user_email: "Athena22@gmail.com",
            user_password: "diyhc{ypSm",
            user_image_url: "https://avatars.githubusercontent.com/u/33960533",
            user_location: "West Hopeworth",
            user_about_me: "Comitatus tabella quia.",
            user_set_up: false,
            instruments: [
              "Electric Guitar",
              "Accordion",
              "Vocals",
              "Mandolin",
              "Trumpet",
            ],
          });
        });
    });
    test("GET 400, responds with a 400 error when requested with wrong data type", () => {
      return request(app)
        .get("/api/users/not_a_number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("GET 404, responds with a 404 error when requested with an id that doesn't exist", () => {
      return request(app)
        .get("/api/users/9000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user does not exist");
        });
    });
  });
  describe("POST", () => {
    test("POST 201: responds with a 201 status code and the posted user", () => {
      const newUser = {
        username: "LukeHarrisonDev",
        full_name: "Luke Harrison",
        user_email: "luke_haz@yahoo.co.uk",
        user_password: "LukeDev123^&*",
        user_image_url: "https://avatars.githubusercontent.com/u/33960533",
        user_location: "Bradford",
        user_about_me:
          "I love playing Guitar and want to get get started with Busking",
        instruments: ["Electric Guitar", "Bass", "Vocals", "Drums"],
      };
      return request(app)
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .then(({ body }) => {
          expect(body.user).toMatchObject({
            users_id: expect.any(Number),
            username: "LukeHarrisonDev",
            full_name: "Luke Harrison",
            user_email: "luke_haz@yahoo.co.uk",
            user_password: "LukeDev123^&*",
            user_image_url: "https://avatars.githubusercontent.com/u/33960533",
            user_location: "Bradford",
            user_about_me:
              "I love playing Guitar and want to get get started with Busking",
            user_set_up: false,
            instruments: ["Electric Guitar", "Bass", "Vocals", "Drums"],
          });
        });
    });
  });

  describe("PATCH", () => {
    test("PATCH 200, alters the users location when given a user_id and returns the updated user", () => {
      const body = { user_location: "Manchester, UK" };
      return request(app)
        .patch("/api/users/2")
        .send(body)
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            users_id: 2,
            username: "Lilian_Padberg35",
            full_name: "Daisy Schumm",
            user_email: "Ellis78@gmail.com",
            user_password: "kvb40gm&mV",
            user_image_url:
              "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/331.jpg",
            user_location: "Manchester, UK",
            user_about_me:
              "Comptus commemoro armarium correptius claudeo ventito beatus.",
            user_set_up: false,
            instruments: ["Oboe", "Piano", "Vocals"],
          });
        });
    });
    test("PATCH 400, responds with a 400 error if the body doesn't contain the correct fields", () => {
      const body = {};
      return request(app)
        .patch("/api/users/2")
        .send(body)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("PATCH 400, responds with a 400 error if there is valid body fields but with invalid values", () => {
      const body = { full_name: 2222 };
      return request(app)
        .patch("/api/users/2")
        .send(body)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("PATCH 400, responds with a 400 error when user_id is the wrong data type", () => {
      const body = { full_name: "Beverly Christiansen" };
      return request(app)
        .patch("/api/users/not_a_number")
        .send(body)
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("PATCH 404, responds with a 404 error when requested with a user_id that doesn't exist", () => {
      const body = { full_name: "Beverly Christiansen" };
      return request(app)
        .patch("/api/users/9000")
        .send(body)
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user does not exist");
        });
    });
  });

  describe("DELETE", () => {
    test("DELETE 204, responds with a status of 204 and no content when a comment is deleted", () => {
      return request(app).delete("/api/users/2").expect(204);
    });
    test("DELETE 400, responds with a 400 error when requested with wrong data type", () => {
      return request(app)
        .delete("/api/users/not_a_number")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("DELETE 404, responds with a 404 error when requested with an id that doesn't exist", () => {
      return request(app)
        .delete("/api/users/9000")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("user does not exist");
        });
    });
  });
});
