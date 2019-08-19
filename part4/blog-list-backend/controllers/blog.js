const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getToken = req => {
    const auth = req.get('authorization');
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7);
    }
    return null;
}

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({})
            .populate('user', { username: 1, name: 1 })
        response.json(blogs.map(b => b.toJSON()))
    } catch (ex) {
        next(ex)
    }
    
})
  
blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getToken(request);

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            author: body.author,
            url: body.author,
            title: body.title,
            likes: body.likes ? body.likes : 0,
            user: user._id
        })
        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved._id);
        await user.save();
        response.json(saved.toJSON())
    } catch (ex) {
        next(ex)
    }
})

blogRouter.delete('/:id', async (req, res, next) => {
    const token = getToken(req);

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const user = await User.findById(decodedToken.id);
        const blog = await Blog.findById(req.params.id);
        
        if(blog && blog.user.toString() === decodedToken.id.toString()) {
            const deleted = await blog.remove();
            user.blogs = user.blogs.filter((_id) => _id.toString() !== deleted._id.toString());
            user.save();
            res.status(204).end()
        } else {
            res.status(401).json({ error: 'delete failed' });
        }
    } catch(ex) {
        next(ex)
    }
})

blogRouter.put('/:id', async (req, res, next) => {
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