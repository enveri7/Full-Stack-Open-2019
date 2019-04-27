const listHelper = require('../utils/list_helper')

const emptyList = []

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const listWithMultipleBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To',
        author: 'Teemu Roivas',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676239999',
        title: 'Go To Statement',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement.html',
        likes: 0,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d8888',
        title: 'Go To Statement Considered',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered.html',
        likes: 4,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d1777',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 3,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(12)
    })

})

describe('favourite blog', () => {

    test('should return favourite blog', () => {
        const resultShouldBe = {
            title: 'Go To',
            author: 'Teemu Roivas',
            likes: 5,
        }
        const result = listHelper.favouriteBlog(listWithMultipleBlogs)
        expect(result).toEqual(resultShouldBe);
    })
})

describe('most blogs', () => {
    const resultShouldBe = { "author": "Edsger W. Dijkstra", "blogs": 3 }
    test('should return author with most blogs', () => {
        const result = listHelper.mostBlogs(listWithMultipleBlogs)
        expect(result).toEqual(resultShouldBe);
    })
})

describe('most likes', () => {
    const resultShouldBe = { "author": "Edsger W. Dijkstra", "likes": 7 }
    test('should return author with most likes in blogs', () => {
        const result = listHelper.mostLikes(listWithMultipleBlogs)
        expect(result).toEqual(resultShouldBe);
    })
})