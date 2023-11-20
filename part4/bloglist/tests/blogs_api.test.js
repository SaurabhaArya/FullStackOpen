const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const helper = require('../utils/blogs_helper')
const api = supertest(app)
const Blog = require('../models/blog')

jest.setTimeout(30000)

beforeEach(async () => {
	await Blog.deleteMany({})
	for (const blog of helper.initialBlogs) {
		let blogObj = new Blog(blog)
		await blogObj.save()
	}
})

test('blogs are returned as JSON', async () => {
	const result = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
	expect(result.body).toHaveLength(helper.initialBlogs.length)
})

test('unique property of a blog is named as "id"', async () => {
	const blogs = await helper.notesInDb()
	expect(blogs[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: '15 JavaScript concepts that every JavaScript Programmer must know',
		author: 'Madasamy M',
		url: 'https://madasamy.medium.com/15-javascript-concepts-that-every-nodejs-programmer-must-to-know-6894f5157cb7',
		likes: 68
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogsAtEnd = await helper.notesInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
	const contents = blogsAtEnd.map(blog => blog.title)
	expect(contents).toContain('15 JavaScript concepts that every JavaScript Programmer must know')
})

test('blog missing likes property in request, will be defaulted to 0', async () => {
	const newBlog = {
		title: '== vs. === in JavaScript',
		author: 'Will Bainton',
		url: 'https://medium.com/@baintonw/vs-in-javascript-4b586d09f856'
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
	const blogsAtEnd = await helper.notesInDb()
	const newlyAddedBlog = blogsAtEnd.find(blog => blog.title === '== vs. === in JavaScript')
	expect(newlyAddedBlog.likes).toBe(0)
})

test('if title or url properties missing from the request, backend responds with 400 Bad Request', async () => {
	const newBlog = {
		author: 'Megan Lo',
		likes: 43
	}
	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)
})



afterAll(async () => {
	await mongoose.connection.close()
})