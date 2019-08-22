import React, {useState} from 'react';
import blogService from '../services/blogs';
import Notification from './Notification';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [notification, setNotification] = useState(null);

    const addBlog = (event) => {
        event.preventDefault();
        const newBlog = {
          title: title,
          author: author,
          url: url
        }
        blogService.create(newBlog).then(res => {
          if(res) {
            blogService.getAll().then(res => {
              let notification = {
                type: 'success',
                message: 'add succeeded'
              }
              setNotification(notification);
              setTimeout(() => {
                setNotification(null);
              }, 1000);
            })
          }
        }).catch(err => {
          let notification = {
            type: 'error',
            message: 'Add failed'
          }
          setNotification(notification);
          setTimeout(() => {
            setNotification(null);
          }, 1000);
        })
        
    }

    return (
        <div>
            {notification &&
                <Notification type={notification.type} message={notification.message} />
            }
            <form onSubmit={addBlog} style={{margin: "20px"}}>
                <h2>Create new</h2>
                <div>
                title
                <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                author
                <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
                </div>
                <div>
                url
                <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
                </div>
                <div>
                <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
};

export default BlogForm;