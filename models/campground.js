//SCHEMA SETUP FOR CAMPGROUND
var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"
			},
			username: String
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