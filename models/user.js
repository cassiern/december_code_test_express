const mongoose = require('mongoose');
const saltRounds = 10;
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isLogged: Boolean
});


module.exports = mongoose.model('User', UserSchema);