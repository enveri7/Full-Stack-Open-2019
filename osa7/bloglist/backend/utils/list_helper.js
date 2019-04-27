var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => {
        acc += blog.likes
        return acc
    }, 0)
}

const favouriteBlog = (blogs) => {
    const max = blogs.reduce(function (prev, current) {
        return (prev.likes > current.likes) ? prev : current
    })
    return { title: max.title, author: max.author, likes: max.likes }
}

const mostBlogs = (blogs) => {
    const countByAuthor = _.countBy(blogs, 'author')
    const author = Object.keys(countByAuthor).reduce((a, b) => countByAuthor[a] > countByAuthor[b] ? a : b)
    return { author: author, blogs: countByAuthor[author] }
}

const mostLikes = (blogs) => {
    const authors = blogs.reduce((a,b) => {
        if(b.author in a) {
            a[b.author] += b.likes
        } else {
            a[b.author] = b.likes
        }
        return a
    }, {})
    const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
    return { author: author, likes: authors[author] }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}