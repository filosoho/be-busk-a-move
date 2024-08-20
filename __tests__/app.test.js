const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");

<<<<<<< HEAD
beforeAll(() => {
  return seed(data);
=======
beforeEach(() => {
	return seed(data);
>>>>>>> 79601c3d91da1364bcc1346cd2b6528665ae6d4d
});

afterAll(() => {
  return db.end();
});

describe("GET /api/busks", () => {
<<<<<<< HEAD
  it("GET 200: should respond with a 200 status code and return an array of busks to the client", () => {
    return request(app)
      .get("/api/busks")
      .expect(200)
      .then((response) => {
        expect(response.body.busks.length).toBeGreaterThan(0);
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
          busk_time: "19:30:42",
          busk_date: "2024-08-14T23:00:00.000Z",
          username: "Vallie_Larkin",
          user_image_url: "https://avatars.githubusercontent.com/u/50587032",
          busk_about_me:
            "Aperte absum universe illo placeat pecto tolero. Statua tardus defleo victus bellum adipisci commodi officia. Ancilla terreo consequuntur comedo coerceo fuga socius nihil tubineus.",
          busk_setup:
            "Tametsi velum thermae carus vulpes voluntarius maxime civis.",
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
            username: "Jodie_Bednar22",
            full_name: "Beverly Christiansen",
            user_email: "Jett91@gmail.com",
            user_password: "Czh}as7hcr",
            user_image_url: "https://avatars.githubusercontent.com/u/84968041",
            user_location: "North Gayleboro, UK",
            user_about_me:
              "Currus texo quaerat quisquam cornu sustineo demoror usque.",
            user_set_up: true,
            instruments: ["Vocals", "Flute"],
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
=======
	it("GET 200: should respond with a 200 status code and return an array of busks to the client", () => {
		return request(app)
			.get("/api/busks")
			.expect(200)
			.then((response) => {
				expect(response.body.busks.length).toBeGreaterThan(0);
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
						username: "Jodie_Bednar22",
						full_name: "Beverly Christiansen",
						user_email: "Jett91@gmail.com",
						user_password: "Czh}as7hcr",
						user_image_url: "https://avatars.githubusercontent.com/u/84968041",
						user_location: "North Gayleboro, UK",
						user_about_me:
							"Currus texo quaerat quisquam cornu sustineo demoror usque.",
						user_set_up: true,
						instruments: ["Vocals", "Flute"],
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
>>>>>>> 79601c3d91da1364bcc1346cd2b6528665ae6d4d
});
