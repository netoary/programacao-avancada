const express = require("express");
const path = require("path");

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "client", "assets")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"));
});

app.listen(process.env.PORT || 8080, () => console.log("Server running..."));
