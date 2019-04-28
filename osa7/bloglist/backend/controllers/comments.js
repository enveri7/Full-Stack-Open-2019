const commentsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response, next) => {
    try {
        const body = request.body
        console.log(request.params.id)
        const BlogId = request.params.id
        const comment = new Comment({
            text: body.text,
            blog: BlogId
        })

        const savedComment = await comment.save()

        const blog = await Blog.findById(BlogId)
        blog.comments = blog.comments.concat(savedComment._id)
        await blog.save()
        response.status(201).json(savedComment.toJSON())
    } catch (exception) {
        next(exception)
    }
})

module.exports = commentsRouter