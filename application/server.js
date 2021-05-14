const express = require("express");
const path = require("path");
const fs = require('fs');
const parser = require('./xmlParser');
const app = express();

app.get("/", (req, res) => {
    const xml = fs.readFileSync('assets/teste.xml', 'utf-8')
    var jsonObj = parser.parseXml(xml);
    res.send(JSON.stringify(jsonObj, null, 2))
});

app.listen(process.env.PORT || 8080, () => console.log("Server running..."))
