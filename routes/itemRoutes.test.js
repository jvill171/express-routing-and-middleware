process.env.NODE_ENV = 'test';

const request = require("supertest");

const app = require("../app.js");
let items = require("../fakeDb.js");

let testItem = {
    name: "icecream",
    price: 2.50,
};

beforeEach(()=>{
    items.push(testItem);
});

afterEach(()=>{
    // ensure this only mutates items, not redefines
    items.length = 0;
});

describe("GET /items", ()=>{
    test("Gets all items", async ()=>{
        const res = await request(app).get('/items')
        console.log(res.body)
        expect(res.statusCode).toBe(200)

    })
})