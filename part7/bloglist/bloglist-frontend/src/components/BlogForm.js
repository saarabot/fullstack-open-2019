import React, { useState } from 'react';
import blogService from '../services/blogs';
import { useField } from '../hooks';
import { connect } from 'react-redux'
import { addNotification, errorNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
    //const [title, setTitle] = useState('');
    const title = useField('text');
    //const [author, setAuthor] = useState('');
    const author = useField('text');
    //const [url, setUrl] = useState('');
    const url = useField('text');

    const addBlog = (event) => {
        event.preventDefault();
        const newBlog = {
          title: title.value,
          author: author.value,
          url: url.value
        }
        blogService.create(newBlog).then(res => {
          if(res) {
            url.reset();
            title.reset();
            author.reset();
            blogService.getAll().then(() => {
              props.addNotification('Success!')
            })
          }
        }).catch(err => {
          console.log(err);
          props.errorNotification('Error!')
        })

    }

    return (
        <div>
            <form onSubmit={addBlog} style={{ margin: '20px' }}>
                <h2>Create new</h2>
                <div>
                title
                <input
                  type="text"
                  value={title.value}
                  onChange={title.onChange} />
                </div>
                <div>
                author
                <input
                  type="text"
                  value={author.value}
                  onChange={author.onChange} />
                </div>
                <div>
                url
                <input
                  type="text"
                  value={url.value}
                  onChange={url.onChange} />
                </div>
                <div>
                <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
};

export default connect(null, { addNotification, errorNotification })(BlogForm);