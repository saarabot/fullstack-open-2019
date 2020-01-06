import React from 'react';
import { useField } from '../hooks';
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addNotification, errorNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
    const { createBlog } = props
    //const [title, setTitle] = useState('');
    const title = useField('text');
    //const [author, setAuthor] = useState('');
    const author = useField('text');
    //const [url, setUrl] = useState('');
    const url = useField('text');

    const addBlog = async (event) => {
        event.preventDefault();
        const newBlog = {
          title: title.value,
          author: author.value,
          url: url.value
        }
        try {
          await createBlog(newBlog)
          props.addNotification('Success!')
          url.reset();
          title.reset();
          author.reset();
        } catch (err) {
          props.errorNotification('Error!')
        }

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

const mapDispatchToProps = {
  createBlog,
  addNotification,
  errorNotification
}

export default connect(null, mapDispatchToProps)(BlogForm);