import React, { useState } from 'react'
import PropTypes from 'prop-types';

const Blog = ({ blog, loggedUser, likeHandler, removeBlog }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '5px',
    border: '2px solid black',
    marginBottom: '5px',
    paddingBottom: '5px',
  };

  const showInfo = () => {
    setShow(!show);
  };

  return (
    <div style={blogStyle}>
      <div className="blogContainer">
        <p className="title" onClick={() => showInfo()} >
          {blog.title} {blog.author}
        </p>
        <div className="expanded" style={show ? { display: 'block' }:{ display: 'none' } }>
          <p>{blog.likes} likes <button onClick={() => likeHandler(blog)}>Like</button></p>
          <a href={blog.url}>{blog.url}</a>
          <p>added by {blog.user ? blog.user.username : 'anonymous'}</p>
          {blog.user.username === loggedUser && <button onClick={() => removeBlog(blog)}>Remove</button>}
        </div>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  reloadList: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired
}

export default Blog