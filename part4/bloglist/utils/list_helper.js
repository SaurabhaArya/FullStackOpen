const dummy = (blogs) => {
	if (!blogs.length) {
		return 1
	}
}

const totalLikes = (blogs) => {
	if (!blogs.length) {
		return 0
	} else {
		return blogs.reduce((accumulator, currentValue) => (accumulator + currentValue.likes), 0)
	}
}

const favoriteBlog = (blogs) => {
	if (!blogs.length) {
		return null
	} else {
		const mostLikedBlog = blogs.reduce((max, obj) => (max.likes > obj.likes ? max : obj), blogs[0])
		return {
			title: mostLikedBlog.title,
			author: mostLikedBlog.author,
			likes: mostLikedBlog.likes
		}
	}
}

const mostBlogs = (blogs) => {
	if (!blogs.length) {
		return null
	} else {
		const authors = {}
		blogs.forEach(blog => {
			authors[blog.author] = authors[blog.author] ? authors[blog.author] + 1 : 1
		})
		const authorWithMaxBlogs = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
		return {
			author: authorWithMaxBlogs,
			blogs: authors[authorWithMaxBlogs]
		}
	}
}

const mostLikes = (blogs) => {
	if (!blogs.length) {
		return null
	} else {
		const authors = {}
		blogs.forEach(blog => {
			authors[blog.author] = authors[blog.author] ? authors[blog.author] + blog.likes : blog.likes
		})
		const authorWithMaxLikes = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
		return {
			author: authorWithMaxLikes,
			likes: authors[authorWithMaxLikes]
		}
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}