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
const { ensureAuth } = require('./auth');
const Lawsuit = require("./source/lawsuit/models/lawsuit");

const PORT = process.env.PORT || 3001;

// Allow CORS
var cors = require('cors')
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

// Authentication
app.use(session({
    secret: process.env.SESSION_SEECRET || "Our little secret.",
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
    googleId: String,
    username: String,
    lawsuits: [
        { 
            type: String,
            ref:'Lawsuit'
        }
    ]
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
      callbackURL: "/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    },
    function(accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id, username:profile.id, name: profile.displayName }, function (err, user) {
        user.accessToken = accessToken;
        return cb(err, user);
      });
    }
));


app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000", session: true }),
  function(req, res) {
    res.redirect("http://localhost:3000");
    //res.json(req.user);
  }
);

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("http://localhost:3000/");
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '//localhost:3000/')));

const assetsPath = 'assets/';
let objs = [];

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
        console.log(jsonObj._id);
    });
});


app.post("/api/registerProcess", ensureAuth, async(req, res) => {
    id = parseInt(req.body.number, 10).toString();
    console.log(id);
    let lawsuit = await Lawsuit.findById(id).exec();
    if (lawsuit == null) {
        const obj = objs.find(p => p._id == id)
        if (obj != null) {
            lawsuit = await Lawsuit.create(obj).then(o => { return o });
        }
    }

    if (lawsuit == null) {
        res.sendStatus(404);
    }

    else {
        req.user.lawsuits.addToSet(lawsuit._id);
        req.user.save();
        console.log(req.user);
        res.json(lawsuit);
    }
});

app.post("/api/unregisterProcess/", (req, res) => {
    req.user.lawsuits.pull({ _id: req.body.number });
    req.user.save();
    res.sendStatus(200);
});

app.get("/api/currentUser", ensureAuth, async(req, res) => {
    user = await User.findById(req.user._id).populate("lawsuits");
    res.send(user);
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
