const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('./tests_helper')

beforeEach(async () => {
    await Blog.remove({})

    const blogObject = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
})

test('blog id should be defined', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'A New Blog',
        author: 'Teemu Roivas',
        url: 'http://localhost:3000/',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
        'A New Blog'
    )
})

test('blog with missing title or url will not be added', async () => {
    const blogMissingTitle = {
        author: 'Teemu Roivas',
        url: 'http://localhost:3000/',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(blogMissingTitle)
        .expect(400)

    const blogMissingUrl = {
        title: "A New Blog",
        author: 'Teemu Roivas',
        likes: 2
    }

    await api
        .post('/api/blogs')
        .send(blogMissingUrl)
        .expect(400)

})

test('if likes are not given it is set to zero', async () => {
    const newBlog = {
        title: 'A New Blog',
        author: 'Teemu Roivas',
        url: 'http://localhost:3000/',
    }

    const blogObject = new Blog(newBlog)
    expect(blogObject.likes).toBe(0)
})

afterAll(() => {
    mongoose.connection.close()
})