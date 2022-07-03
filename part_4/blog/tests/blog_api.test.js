const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  }, 100000)

describe('when there is initially some notes saved', () => {
    test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    
    expect(contents).toContain('React patterns')
  })
})

describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToView = blogsAtStart[0]
  
      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  
      expect(resultBlog.body).toEqual(processedBlogToView)
    })
  
    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
  
      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })
  
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'
  
      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })
describe('addition of a new note', () => {
    test('A valid blog can be added', async () => {
        const newBlog = {
            title: "async/await simplifies making async calls",
            author: "Mark Trudeau",
            url: "https://asyncawait.com/",
            likes: 12,
          }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(contents).toContain
        ('async/await simplifies making async calls')
    },100000)
})
describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async ()=> {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
          .delete(`/api/blogs/${blogToDelete.id}`)
          .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd).toHaveLength(
          helper.initialBlogs.length - 1
        )
    
        const contents = blogsAtEnd.map(r => r.title)
    
        expect(contents).not.toContain(blogToDelete.title)
      })
    })
    describe('Update a blog', () => {
      test('update the amount of likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[1]
      
        const updatedBlog = {
          ...blogToView,
          likes: blogToView.likes + 1
             }
    
        await api
          .put(`/api/blogs/${blogsAtStart[1].id}`)
          .send(updatedBlog)
          .expect(200)

          const blogsAtEnd = await helper.blogsInDb()
          expect(blogsAtEnd[1].likes === 6)
      })
    })

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  },100000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
