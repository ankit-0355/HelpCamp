var express = require("express");
var router = express.Router({mergeParams: true}); 
var Campground = require("../models/campground");
var Comment = require("../models/comment");


router.get("/new", IsLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
		} else {
			res.render("comment/new", {campground: campground});
		}
	})
});

router.post("/", IsLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			res.redirect("/campground");
		} else {
			// push the comment in to data base
			Comment.create(req.body.comment, function(err, comment){
				if (err) {
					console.log(err);
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campground/" + campground._id);
				}
			});
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