const express = require("express");
const app = express();
const itemsRoutes = require("./routes/items");

// Middleware to parse JSON
app.use(express.json());

// Use items routes
app.use("/items", itemsRoutes);

// Start server
if (process.env.NODE_ENV !== "test") {
    app.listen(3000, () => {
    console.log("App running on port 3000");
    });
}

module.exports = app;
