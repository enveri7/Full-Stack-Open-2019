const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')
const helper = require('./tests_helper')

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', password: 'root' })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'teme',
            name: 'Teemu Roivas',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('invalid user will not be created', async () => {

        const userWithoutPassword = {
            username: 'teme',
            name: 'Teemu Roivas',
        }
        const userWithoutUsername = {
            name: 'Teemu Roivas',
            password: 'salainen',
        }
        const userWithTooShortPassword = {
            username: 'teme',
            name: 'Teemu Roivas',
            password: 'sa',
        }
        const userWithTooShortUsername = {
            username: 'te',
            name: 'Teemu Roivas',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(userWithoutPassword)
            .expect(400, { error: "password missing" })

        await api
            .post('/api/users')
            .send(userWithoutUsername)
            .expect(400, {
                error: "User validation failed: username: Path `username` is required."
            })

        await api
            .post('/api/users')
            .send(userWithTooShortPassword)
            .expect(400, {
                error: "Password should be atleast 3 characters long"
            })

        await api
            .post('/api/users')
            .send(userWithTooShortUsername)
            .expect(400, {
                error: "User validation failed: username: Path `username` (`te`) is shorter than the minimum allowed length (3)."
            })
    })

    test('duplicate user will not be created', async () => {

        const duplicate = { username: 'root', password: 'root' }

        await api
            .post('/api/users')
            .send(duplicate)
            .expect(409, {
                error: "E11000 duplicate key error collection: bloglist-test.users index: username_1 dup key: { : \"root\" }"
            })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
