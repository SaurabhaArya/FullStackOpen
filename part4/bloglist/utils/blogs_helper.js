const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'How to get started with MongoDB',
		author: 'Navindu Jayatilake',
		url: 'https://medium.com/free-code-camp/learn-mongodb-a4ce205e7739',
		likes: 45
	},
	{
		title: 'The missing introduction to React',
		author: 'Eric Elliot',
		url: 'https://medium.com/javascript-scene/the-missing-introduction-to-react',
		likes: 62
	}
]

const notesInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs,
	notesInDb
}