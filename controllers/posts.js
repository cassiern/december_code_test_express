const express = require('express');
const router = express.Router();
const Post = require('../models/posts');



//get route
router.get('/', async (req, res) => {
	console.log('get route')
	try{
		const allPosts = await Post.find();
		res.json({
			status: {
				code: 200,
				message: 'Success'
			},
			data: allPosts
		})

	}catch(err){
		console.log(err, '<-- error in GET route');
		res.send(err);
	}
})


//create route
router.post('/', async (req, res) => {
	try{

		console.log(req.body, '<-- req.body');
		const createdPost = await Post.create(req.body);
		console.log('waiting for body to be created');
		res.json({
			status: {
				code: 201,
				message: "Post successfully created"
			},
			data: createdPost
		})

	}catch(err){
		console.log(err);
		res.send(err);
	}
})


//update/edit route
router.get('/:id', async (req, res) => {
	try{
		const onePost = await Post.findById(req.params.id);
		res.json({
			status: {
			code: 200,
			message: 'Success'
		},
			data: onePost
		})

	}catch(err){
		console.log(err, '<-- error in edit express route');
		res.send(err)
	}
})


//edit 
router.put('/:id', async (req,res) => {
	try{
		const postToUpdate = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
		console.log(req.params.id, req.body, '<-- params and body');
		res.json({
			status: {
				code: 201,
				message: 'Post updated successfully'
			},
			data: postToUpdate
		})
	}catch(err){
		console.log(err, '<-- error in updating route')
		res.send(err);
	}
})


//delete route
router.delete('/:id', async(req,res) =>{
	try{
		const deletePost = await Post.findByIdAndRemove(req.params.id);
		console.log(deletePost, '<-- deleted Post in Express')
		res.json({
			status: {
				code: 200,
				message: 'Post successfully deleted'
			},
			data: deletePost
		})
	}catch(err){
		console.log(err, '<-- error in express delete route');
		res.send(err);
	}
})




module.exports = router;