var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){
	//Finding all campgrounds from helpcamp db
	Campground.find({}, function(err, allcampgrounds){
		if(err) {
			console.log(err)
		} else {
		// Rendering the index page.  campground is name used in campground.ejs file
		 res.render("campground/campground", {campgrounds: allcampgrounds});
		}
	});
});

router.get("/new", IsLoggedIn, function(req, res){
	res.render("campground/new");
});

router.post("/", IsLoggedIn ,function(req, res){
	//Getting name & image using bodyParser
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author= {
		id: req.user._id,
		username: req.user.username
	}
	
	//Storing data in an obj
	var newCampground = {name: name, image: image, description: description, author: author}
	//Using create function on Campground which is model. Passing obj
	Campground.create(newCampground, function(err, newlyCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/campground");
		}
	});
});

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec (function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("campground/show", {campground: foundCampground});	
		}
	});
});

function IsLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;