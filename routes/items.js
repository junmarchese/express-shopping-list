const express = require("express");
const router = new express.Router();
const items = require("../fakeDb");

// GET /items - Render a list of shopping items.
router.get("/", (req, res) => {
    return res.json(items);
});


// POST /items - Add a new item as JSON data to shopping list.
router.post("/", (req, res) => {
    const newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    return res.status(201).json({ added: newItem });
});


// GET /items/:name - Display a specific item's name and price.
router.get("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" });
    }
    return res.json(foundItem);
});


// PATCH /items/:name - Modify a specific item's name and/or price.
router.patch("/:name", (req, res) => {
    const foundItem = items.find(item => item.name === req.params.name);
    if (!foundItem) {
        return res.status(404).json({ error: "Item not found" });
    }
    foundItem.name = req.body.name || foundItem.name;
    foundItem.price = req.body.price || foundItem.price;
    return res.json({ updated: foundItem });
});

// DELETE /items/:name - Delete a specific item from the array
router.delete("/:name", (req, res) => {
    const itemIdx = items.findIndex(item => item.name === req.params.name);
    if (itemIdx === -1) {
        return res.status(404).json({ error: "Item not found" });
    }
    items.splice(itemIdx, 1);
    return res.json({ message: "Deleted" });
});

module.exports = router;