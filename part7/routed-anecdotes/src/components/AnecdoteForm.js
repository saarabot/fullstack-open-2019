import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

const CreateNew = (props) => {
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [info, setInfo] = useState('')
  
    const handleSubmit = (e) => {
      e.preventDefault()

      props.addNew({
        content,
        author,
        info,
        votes: 0
      })
      props.history.push('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>content</label>
            <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>author</label>
            <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>url for more info</label>
            <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
          </Form.Field>
          <Button type="submit">create</Button>
        </Form>
      </div>
    )
  
  }


export default withRouter(CreateNew)