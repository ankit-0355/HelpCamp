//SCHEMA SETUP FOR CAMPGROUND
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var user = new mongoose.Schema({
	username: String,
	password: String
});

user.plugin(passportLocalMongoose)

//Making mongoose model on "Canmpground"
module.exports = mongoose.model("User", user);