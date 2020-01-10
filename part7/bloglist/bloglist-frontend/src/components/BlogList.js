import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs, deleteBlog, likeBlog, clearBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import FormBlog from './BlogForm';
import Togglable from './Togglable';

const BlogList = (props) => {
    const { initBlogs, blogs, user } = props

    useEffect(() => {
        initBlogs()
    }, [])

    useEffect(() => {
        if(user === undefined) {
            console.log('user is undefined')
            clearBlogs()
        }
    }, [user])


    return(
        <div>
            <Togglable buttonLabel="Add new blog">
                <FormBlog />
            </Togglable>
            <h2>Bloglist</h2>
            <div style={{ 'padding':'10px' }}>
                {blogs && blogs.sort(function(a,b) {return b.likes - a.likes }).map(blog => <div key={blog.id} style={{ 'padding': '10px' }}><Link to={`/blog/${blog.id}`}>{blog.title}</Link><hr/></div> ) }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      blogs: state.blogs,
      user: state.login.user
    }
  }

const mapDispatchToProps = {
    initBlogs, deleteBlog, likeBlog, clearBlogs
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)