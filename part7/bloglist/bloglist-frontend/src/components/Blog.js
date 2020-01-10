import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { initBlogs, deleteBlog, likeBlog, clearBlogs } from '../reducers/blogReducer'

const Blog = (props) => {
  const [selectedBlog, setSelectedBlog] = useState(null)
  const { blogs, loggedUser } = props
  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '5px',
    border: '2px solid black',
    marginBottom: '5px',
    paddingBottom: '5px',
  };

  useEffect(() => {
    console.log(props)
    console.log(props.match.params)
    if(blogs) {
      let temp = blogs.filter(b => {
        return b.id === props.match.params.id
      })
      if(temp[0]) {
        setSelectedBlog(temp[0])
      }
    }
  }, [])

  const reloadList = () => {
    props.initBlogs()
  }

  const likeHandler = async (blog) => {
    let temp = blog;
    temp.likes = temp.likes +1;
    console.log(temp)
    await props.likeBlog(temp)
    reloadList();
}

  const removeBlog = async (blog) => {
      let ok = window.confirm(`remove blog: ${blog.title}`);
      if(ok) {
          await props.deleteBlog(blog.id);
          reloadList();
      }
  }

  if(selectedBlog !== null) {
    return (

      <div style={blogStyle}>
        <div className="blogContainer">
          <p className="title" >
            {selectedBlog.title} {selectedBlog.author}
          </p>
          <div className="expanded" style={{ display: 'block' } }>
            <p>{selectedBlog.likes} likes <button onClick={() => likeHandler(selectedBlog)}>Like</button></p>
            <a href={selectedBlog.url}>{selectedBlog.url}</a>
            <p>added by {selectedBlog.user ? selectedBlog.user.username : 'anonymous'}</p>
            {selectedBlog.user.username === loggedUser.username && <button onClick={() => removeBlog(selectedBlog)}>Remove</button>}
          </div>
        </div>
      </div>
    );
  } else {
    return null
  }
};

Blog.propTypes = {
  //blog: PropTypes.object.isRequired,
  //reloadList: PropTypes.func.isRequired,
  //loggedUser: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.login.user
  }
}

const mapDispatchToProps = {
  initBlogs, deleteBlog, likeBlog, clearBlogs
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog))