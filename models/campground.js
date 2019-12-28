//SCHEMA SETUP FOR CAMPGROUND
var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	user:
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

//Making mongoose model on "Canmpground"
module.exports = mongoose.model("Campground", campgroundSchema);