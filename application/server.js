const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.listen(process.env.PORT || 8080, () => console.log("Server running..."));
