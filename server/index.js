const express = require("express");
const path = require('path');
const fs = require('fs');
const parser = require('./xmlParser');

const PORT = process.env.PORT || 3001;

var cors = require('cors')
const app = express();

app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api/getRows", (req, res) => {
    const xml = fs.readFileSync('assets/teste.xml', 'utf-8')
    var jsonObj = parser.parseXml(xml);
    res.json(jsonObj);
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
