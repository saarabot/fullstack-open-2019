import React, { useState } from 'react'
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, reloadList, loggedUser }) => {
  const [show, setShow] = useState(false);

  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '5px',
    border: '2px solid black',
    marginBottom: '5px',
    paddingBottom: '5px',
  };

  const onClickHandler = (source) => {
    if(source === 'toggle') {
      setShow(!show);
    } else {
      let temp = blog;
      temp.likes = temp.likes +1;
      blogService.addLike(temp).then(() => {
        reloadList();
      }).catch(err => {
        console.log(err);
      })
    }
  };

  const removeBlog = () => {
    let ok = window.confirm(`remove blog: ${blog.title}`);
    if(ok) {
      blogService.remove(blog.id).then(() => {
        reloadList();
      }).catch(err => {
        console.log(err);
      })
    }
  }

  return (
    <div style={blogStyle}>
      <div className="blogContainer">
        <p className="title" onClick={() => onClickHandler('toggle')} >
          {blog.title} {blog.author}
        </p>
        <div className="expanded" style={show ? { display: 'block' }:{ display: 'none' } }>
          <p>{blog.likes} likes <button onClick={() => onClickHandler('like')}>Like</button></p>
          <a href={blog.url}>{blog.url}</a>
          <p>added by {blog.user ? blog.user.username : 'anonymous'}</p>
          {blog.user.username === loggedUser && <button onClick={removeBlog}>Remove</button>}
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