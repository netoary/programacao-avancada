const express = require("express");
const path = require('path');
const fs = require('fs');
const parser = require('./xmlParser');

const PORT = process.env.PORT || 3001;

var cors = require('cors')
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors())

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const assetsPath = 'assets/';
let objs = [];
let registredObjs = [];

fs.readdir(assetsPath, function (err, files) {
    // handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    //listing all files using forEach
    files.forEach(function (file) {
        const xml = fs.readFileSync(assetsPath + file, 'utf-8')
        var jsonObj = parser.parseXml(xml);
        objs.push(jsonObj);
    });
});

app.get("/api/registerProcess/:number", (req, res) => {
    const obj = objs.find(p => p.id == req.params.number)
    if (obj == null) {
        res.sendStatus(404);
    }
    else {
        if(registredObjs.findIndex(p => p.id == req.params.number) === -1)
        {
            registredObjs.push(obj);
        }
        res.json(obj);
    }
});

app.post("/api/unregisterProcess/", (req, res) => {
    const id = registredObjs.findIndex(p => p.id == req.body.number)
    console.log(id);
    console.log(req.body.number);

    if (id === -1) {
        res.sendStatus(404);
    }
    else {
        registredObjs.splice(id, 1);
        res.sendStatus(200);
    }
});

app.get("/api/getRegistredProcess", (req, res) => {
    res.json(registredObjs);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
