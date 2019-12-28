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

router.get("/new", function(req, res){
	res.render("campground/new");
});

router.post("/", function(req, res){
	//Getting name & image using bodyParser
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	//Storing data in an obj
	var newCampground = {name: name, image: image, description: description}
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

module.exports = router;