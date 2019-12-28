//SCHEMA SETUP FOR CAMPGROUND
var mongoose = require("mongoose");
var comment = new mongoose.Schema({
	
	text: String,
	author: {
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User"	
			},
				username: String,
	}
});

//Making mongoose model on "Canmpground"
module.exports = mongoose.model("Comment", comment);