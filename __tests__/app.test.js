const db = require('../db/connection')
const seed = require('../db/seeds/seed')
const request = require('supertest')
const app = require('../app')
const data = require('../db/data/test-data/index')

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return db.end()
})

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
                expect(busk).toHaveProperty('busk_location')
                expect(busk).toHaveProperty('busk_location_name')
                expect(busk).toHaveProperty('busk_time')
                expect(busk).toHaveProperty('busk_date')
                expect(busk).toHaveProperty('username')
                expect(busk).toHaveProperty('user_image_url')
                expect(busk).toHaveProperty('busk_about_me')
                expect(busk).toHaveProperty('busk_setup')
            })
        })
    })
    
})