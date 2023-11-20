const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
	const result = await Blog.find({})
	res.json(result)
})
  
blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	const result = await blog.save()
	res.status(201).json(result)
})

module.exports = blogRouter