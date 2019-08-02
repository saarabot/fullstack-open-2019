const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper');
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs
        .map(b => new Blog(b))
    const promiseArray = blogs.map(b => b.save())
    await Promise.all(promiseArray)
})

describe('there is blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    })

    test('theres right amount of blogs', async () => {
        const res = await helper.blogsInDb();
        expect(res.length).toBe(helper.initialBlogs.length)
    })
})

describe('adding a blog', () => {
    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
        }  
    
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
        'Type wars'
        )
    })

    test('blog without title and url is not added', async () => {
        const newBlog = {
            author: "testman"
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
    })
})

describe('deleting a blog', () => {
    test('succeeds with a code 204', async () => {
        const atStart = await helper.blogsInDb()
        const toBeDeleted = atStart[0];

        await api
            .delete(`/api/blogs/${toBeDeleted.id}`)
            .expect(204)
        
            const atEnd = await helper.blogsInDb()
            expect(atEnd.length).toBe(atStart.length - 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})