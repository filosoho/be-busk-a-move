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
