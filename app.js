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

//seedDB();

// Requiring Routes ============================================================
//var locationRoutes         = require("./routes/location"),
var indexRoutes = require("./routes/index");

//==============================================================================

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
//==============================================================================
// PASSPORT CONFIGURATION
//==============================================================================
app.use(require("express-session")({
    secret: "Location, location, location",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//==============================================================================
/*app.get("/", function(req, res){
    res.render("landing");
});*/

//==============================================================================

app.use("/", indexRoutes);
//app.use("/location", locationsRoutes);

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});