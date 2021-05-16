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

const loadedAssetsPath = 'assets/loaded/';
const unLoadedAssetsPath = 'assets/unloaded/';

app.get("/api/getRegistredProcess", (req, res) => {
    
    fs.readdir(loadedAssetsPath, function (err, files)
    {
        // handling error
        if (err)
        {
            return console.log('Unable to scan directory: ' + err);
        } 

        let objs = [];
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);

            const xml = fs.readFileSync(loadedAssetsPath + file, 'utf-8')
            var jsonObj = parser.parseXml(xml);
            jsonObj.fileName = file;
            objs.push(jsonObj);
        });
        res.json(objs);
    });
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
