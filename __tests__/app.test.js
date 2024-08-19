const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe("GET /api/busks", () => {
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
});
