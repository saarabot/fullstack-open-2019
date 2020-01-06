import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initBlogs, deleteBlog, likeBlog } from '../reducers/blogReducer'
import Blog from './Blog'

const BlogList = (props) => {
    const { initBlogs, deleteBlog, blogs, likeBlog } = props
    let user = {
        username: 'saara'
    }
    useEffect(() => {
        initBlogs()
    }, [])

    const reloadList = () => {
        initBlogs()
    }

    const likeBlogHandler = async (blog) => {
        let temp = blog;
        temp.likes = temp.likes +1;
        console.log(temp)
        await likeBlog(temp)
        reloadList();
    }

    const remove = async (blog) => {
        let ok = window.confirm(`remove blog: ${blog.title}`);
        if(ok) {
            await deleteBlog(blog.id);
            reloadList();
        }
    }

    return(
        <div>
            <h2>Bloglist</h2>
            {blogs && blogs.sort(function(a,b) {return b.likes - a.likes }).map(blog => <Blog key={blog.id} blog={blog} reloadList={reloadList} loggedUser={user.username} removeBlog={remove} likeHandler={likeBlogHandler} />)}
        </div>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
      blogs: state.blogs
    }
  }

const mapDispatchToProps = {
    initBlogs, deleteBlog, likeBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)