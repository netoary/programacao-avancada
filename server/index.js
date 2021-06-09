require("dotenv").config({path: "./google.env"});

const express = require("express");
const path = require('path');
const fs = require('fs');
const parser = require('./source/lawsuit/services/xmlParser');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

const PORT = process.env.PORT || 3001;

// Allow CORS
var cors = require('cors')
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors())

// Authentication
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Database connection
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

// User schema
const userSchema = new mongoose.Schema ({
    name: String,
    googleId: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());passport.serializeUser(function(user, done) {
    done(null, user.id);
  });passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id, name: profile.displayName }, function (err, user) {
        console.log(user);
        return cb(err, user);
      });
    }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("http://localhost:3000");
  }
);

app.get("/logout", function(req, res){
    res.redirect("http://localhost:3000/");
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '//localhost:3000/')));

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
