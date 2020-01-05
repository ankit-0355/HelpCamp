var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");

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

router.get("/new", middleware.IsLoggedIn, function(req, res){
	res.render("campground/new");
});

router.post("/", middleware.IsLoggedIn ,function(req, res){
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

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			res.render("campground/edit",{campground: foundCampground});
		}
	});
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, {$set: req.body.campground}, function(err, updatedcampground){
		if(err){
			console.log(err);
			res.redirect("/campground");
		} else {
			res.redirect("/campground/"+ updatedcampground._id);
		}
	});
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err) {
			console.log(err);
			res.redirect("/campground");
		} else {
			res.redirect("/campground");
		}
	});
});

module.exports = router;