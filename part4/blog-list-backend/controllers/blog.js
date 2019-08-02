const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response, next) => {
    console.log('get')
    try {
        const blogs = await Blog.find({})
        response.json(blogs.map(b => b.toJSON()))
    } catch (ex) {
        next(ex)
    }
    
})
  
blogRouter.post('/', async (request, response, next) => {
    console.log('post')
    const body = request.body
    const blog = new Blog({
        author: body.author,
        url: body.author,
        title: body.title,
        likes: body.likes ? body.likes : 0
    })

    try {
        const saved = await blog.save()
        response.json(saved.toJSON())
    } catch (ex) {
        next(ex)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    try {
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch(ex) {
        next(ex)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
    console.log('put')
    const body = req.body;
    try {
        const blog = {
            author: body.author,
            url: body.url,
            title: body.title,
            likes: body.likes
        };

        const updated = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        res.json(updated.toJSON());
    
    } catch (ex) {
        next(ex)
    }

})

module.exports = blogRouter