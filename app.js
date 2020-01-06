var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");

var Campground = require("./models/campground");
var User = require("./models/User");
var Comment = require("./models/comment");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//mongoose.connect("mongodb://localhost:27017/helpcamp",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb+srv://Ankit:Ankit@1998@cluster0-q9yjw.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useFindAndModify', false);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

//Passoprt Configuration
app.use(require("express-session")({
	secret: "String to encrypt password",
	resave: false,
	saveUninitialized: false
}));
		
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
		
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
   	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
   next();
});

app.use("/",indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);

app.listen(3000, function(){
	console.log("Server started...");
});