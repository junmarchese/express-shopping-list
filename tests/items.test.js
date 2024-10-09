const request = require("supertest");
const app = require("../app");
let items = require("../fakeDb");
const Test = require("supertest/lib/test");

beforeEach(() => {
    // Seed array with an initial item before each test
    items.push({ name: "popsicle", price: 1.45 });
});

afterEach(() => {
    // Clear array after each test
    items.length = 0;
})

describe("GET /items", () => {
    test("Renders a list of items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([{ name: "popsicle", price: 1.45 }]);
    });
});

describe("POST /items", () => {
    test("Adds a new item to the list", async () => {
        const res = await request(app).post("/items").send({ name: "cheerios", price: 3.40 });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { name: "cheerios", price: 3.40 } });
        expect(items.length).toBe(2);
    });
});

describe("GET /items/:name", () => {
    test("Gets a specific item's by name and display name and price", async () => {
        const res = await request(app).get("/items/popsicle");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ name: "popsicle", price: 1.45 });
    });
    test("Responds with 404 if item not found", async () => {
        const res = await request(app).get("/items/snickers");
        expect(res.statusCode).toBe(404);
    });
});

describe("PATCH /items/:name", () => {
    test("Modifies a specific item's name and/or price", async () => {
        const res = await request(app).patch("/items/popsicle").send({ name: "new popsicle", price: 2.45 });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "new popsicle", price: 2.45 } });
        expect(items[0]).toEqual({ name: "new popsicle", price: 2.45 });
    });

    test("Responds with 404 if item not found for update", async () => {
        const res = await request(app).patch("/items/snickers").send({ name: "new popsicle", price: 2.45 });
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("Deletes a specific item by name from array", async () => {
        const res = await request(app).delete("/items/popsicle");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
        expect(items.length).toBe(0);
    });

    test("Responds with a 404 if item is not found for deletion", async () => {
        const res = await request(app).delete("/items/snickers");
        expect(res.statusCode).toBe(404);
    });
});

