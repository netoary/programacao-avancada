const express = require("express");
const path = require('path');
const fs = require('fs');
const parser = require('./source/lawsuit/services/xmlParser');
const mongoose = require('mongoose');

const session = require('express-session')
const grant = require('grant-express')

const PORT = process.env.PORT || 3001;

mongoose
    .connect('mongodb://db/3002', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database is connected.")
    })
    .catch((err) => {
        console.log("Database connection was unsuccessful.")
        console.log(err)
        process.exit(1)
    })
require('dotenv').config()

var qs = require('qs');

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

app.use(session({secret: process.env.OAUTH_SECRET}))
app.use(grant(require('./config.json')))
// app.use('/redirect', (req, res) => res.end(JSON.stringify(req.session, null, 2)))
app.use('/redirect', (req, res) => res.redirect("http://localhost:3001/overview"+ "/?" + qs.stringify(req.session)))


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
        if(registredObjs.findIndex(p => p.id == req.params.number) === -1) {
            registredObjs.push(obj);
            res.json(obj);
        }
        else {
            res.sendStatus(204);
        }
    }
});

app.post("/api/unregisterProcess/", (req, res) => {
    const id = registredObjs.findIndex(p => p.id == req.body.number)

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
