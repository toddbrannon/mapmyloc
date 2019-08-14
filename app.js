var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash = require("connect-flash"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require("method-override");

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Root route===================================================================
app.get("/", function(req, res) {
    res.render("index");
});

const port = process.env.PORT || 5000;

app.use(methodOverride("_method"));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

// Requiring Routes ============================================================
var indexRoutes = require("./routes/index");

// Load Keys ===================================================================
const keys = require('./config/keys');

// Map global promises
mongoose.Promise = global.Promise;

/*mongoose.connect(keys.mongoURI, {
        useMongoClient: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
*/

app.use("/", indexRoutes);

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});