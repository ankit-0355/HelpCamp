var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middlewares

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err) {
                req.flash("error", "Campground not Found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
					req.flash("error", "You don't have Permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
		req.flash("error", "You Need to be Logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err) {
				console.log(err);
				res.redirect("back");
			} else {
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have Permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You Need to be Logged in to do that");
		res.redirect("back");
	}
}

middlewareObj.IsLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please Login First!");
	res.redirect("/login");
}

module.exports = middlewareObj;