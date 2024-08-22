const {checkInstrumentExists} = require("../utils/checkInstrumentExists")
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data")

beforeEach (() => seed(data))
afterAll(() => db.end());

describe("checkInstrumentExists", () => {
    it("Returns a promise", () => {
        const result = checkInstrumentExists("Electric Guitar")
        expect(result instanceof Promise).toBe(true)
    })
    it("Returns true if the given instrument exists on the 'busk_selected_instruments' value array", () => {
        const result = checkInstrumentExists("Electric Guitar")
        return result.then((results) => {
            expect(results).toBe(true)
        })
    })
    it("Returns false if the given instrument doesn't exists on the 'busk_selected_instruments' value array", () => {
        const result = checkInstrumentExists("Not an Instrument")
        return result.then((results) => {
            expect(results).toBe(false)
        })
    })
})