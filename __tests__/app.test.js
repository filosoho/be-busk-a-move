const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const request = require("supertest");
const app = require("../app");
const data = require("../db/data/test-data/index");

beforeAll(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe('GET /api/busks' ,() => {
    it('GET 200: should respond with a 200 status code and return an array of busks to the client', () => {
        return request(app)
        .get('/api/busks')
        .expect(200)
        .then((response) => {
            const busks = response.body.busks
            expect(busks.length).toBeGreaterThan(0)
            expect(Array.isArray(busks)).toBe(true)
            busks.forEach((busk) => {
                expect(busk).toHaveProperty('busk_id')
                expect(busk.busk_id).toBeNumber()
                expect(busk).toHaveProperty('busk_location')
                expect(busk.busk_location).toBeObject()
                expect(busk).toHaveProperty('busk_location_name')
                expect(busk.busk_location_name).toBeString()
                expect(busk).toHaveProperty('busk_time')
                expect(busk.busk_time).toBeString()
                expect(busk).toHaveProperty('busk_date')
                expect(busk.busk_date).toBeString()
                expect(busk).toHaveProperty('username')
                expect(busk.username).toBeString()
                expect(busk).toHaveProperty('user_image_url')
                expect(busk.user_image_url).toBeString()
                expect(busk).toHaveProperty('busk_about_me')
                expect(busk.busk_about_me).toBeString()
                expect(busk).toHaveProperty('busk_setup')
                expect(busk.busk_setup).toBeString()
            })
        })
    })
})
describe('POST /api/busks', () => {
    it('should respond with a 201 status code and add a busk to the database', () => {
      const newBusk = {
        busk_location: { latitude: 40.7128, longitude: -74.0060 },
        busk_location_name: 'Central Park',
        busk_time: '15:00:00', 
        busk_date: null,
        username: 'Jodie_Bednar22',
        user_image_url: 'http://example.com/image.jpg',
        busk_about_me: 'Looking for musicians!',
        busk_setup: 'Guitar and vocals',
      };
  
      return request(app)
        .post('/api/busks')
        .send(newBusk)
        .expect(201)
        .then(response => {
            console.log(response, '<<<back in test')
          expect(response.body.busk).toEqual({
            busk_location: { latitude: 40.7128, longitude: -74.0060 },
            busk_location_name: 'Central Park',
            busk_time: '15:00:00', 
            busk_date: null,
            busk_id: 5,
            username: 'Jodie_Bednar22',
            user_image_url: 'http://example.com/image.jpg',
            busk_about_me: 'Looking for musicians!',
            busk_setup: 'Guitar and vocals',
          })
  
        })
       
    });
  });