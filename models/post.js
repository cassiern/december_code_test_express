const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	text: String,
	image: String,
	timeStamp: Date,
	comments: [{
		commentText: String,
		commentPosted: Date
	}]
})



module.exports = mongoose.model('Post', PostSchema);