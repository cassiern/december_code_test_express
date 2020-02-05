const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');


//CREATE (REGISTER) user
router.post('/register', async(req, res) => {
	
		const password = req.body.password;
		const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(12))
		console.log(hashedPassword, '<-- users hashed password');

		req.body.password = hashedPassword;
		console.log('RIGHT BEFORE THE TRY IN REGI ROUTE')
		console.log(req.body)
	try{
		const createdUser = await User.create(req.body);
		console.log(createdUser, '<-- USER CREATED');

		req.session.userId = createdUser._id;
		req.session.email = createdUser.email;
		req.session.logged = true;
		res.data = {
						"email":  req.body.email, "id": req.session.userId}
		res.json(
				{ 
				data: res.data,
				status: {
				code: 200,
				message: 'User logged in'
			}
		})

	}catch(err){
		console.log(err, 'AFTER regi route')

		res.send(err)
	}
})



//LOGIN user
router.post('/login', async(req, res) => {
	
	//does user exist?
	try{
		const userExists = await User.findOne({email: req.body.email});
		console.log(userExists, '<-- found the user');

		//if user exists... check users password
		if(userExists){
			if(bcrypt.compareSync(req.body.password, userExists.password)){
				req.session.userId = userExists._id;
				req.session.email = userExists.email;
				req.session.logged = true;
				res.data = { "email": req.session.email, "id": req.session.userId}
				res.json({
					data: res.data,
					status: {
						code: 200,
						message: 'User logged in'
					}
				})
			}else{
				//tell user something is incorrect
				res.json({
					status: {
						code: 200,
						message: 'Username or password is incorrect'
					}
				})
			}
		}else{
			//telling user that something is wrong again
			res.json({
				status: {
					code: 200,
					message: 'Username or password is incorrect'
				}
			})
		}
	}catch(err){
		res.send(err)
	}
})



//Logout user
router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if(err){
			res.send(err);
		}else{
			res.json({
				status: {
					code: 200,
					message: 'User logged out'
				}
			})
		}
	})
})


module.exports = router;