process.env.NODE_ENV = 'test';

const request = require("supertest");

const app = require("../app.js");
let items = require("../fakeDb.js");

let icecream = { name: "icecream", price: 2.50, };
let item1 = { name: "cheese", price: 3.20, };

beforeEach(()=>{
    items.push(icecream);
});

afterEach(()=>{
    // ensure this only mutates items, not redefines
    items.length = 0;
});

describe("GET /badRoute", ()=>{
    test("Attempt to acces an invalid route", async ()=>{
        const res = await request(app).get('/badRoute')
        
        expect(res.statusCode).toBe(404)
    })
})

describe("GET /items", ()=>{
    test("Gets all items", async ()=>{
        const res = await request(app).get('/items')
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "fakeDb": [icecream] })
    })
})

describe("POST /items", ()=>{
    test("Creating a new item", async ()=>{
        const res = await request(app).post('/items').send(item1)
        
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ "added": item1 })
    })
})

describe("GET /items/:name", ()=>{
    test("Gets specific item", async ()=>{
        const res = await request(app).get(`/items/${icecream.name}`)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "foundItem": icecream })
    })
    test("Attempt to get a specific INVALID item", async ()=>{
        const res = await request(app).get(`/items/invalidName`)
        
        expect(res.statusCode).toBe(404)
    })
})

describe("PATCH /items/:name", ()=>{
    test("Update a specific item", async ()=>{
        const res = await request(app).patch(`/items/${icecream.name}`).send(item1)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ "updated": item1 })
    })
    test("Attempt to update a specific INVALID item", async ()=>{
        const res = await request(app).patch(`/items/invalidName`).send(item1)
        
        expect(res.statusCode).toBe(404)
    })
})

describe("DELETE /items/:name", ()=>{
    test("Delete a specific item", async ()=>{
        const res = await request(app).delete(`/items/${icecream.name}`)
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({"message": "Deleted"})
    })
    test("Delete a specific INVALID item", async ()=>{
        const res = await request(app).delete(`/items/invalidName`)
        
        expect(res.statusCode).toBe(404)
    })
})



// GET, PATCH, DELETE
// /items/:name