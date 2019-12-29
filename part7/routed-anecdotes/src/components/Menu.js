import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import About from './About'
import AnecdoteList from './AnecdoteList'
import CreateNew from './AnecdoteForm'
import Anecdote from './Anecdote'

const Menu = ({anecdotes, addNew}) => {

    const linkStyle = {
      padding: '10px'
    }
    return (
      <Router>
        <div>
          <div>
            <Link style={linkStyle} to="/">home</Link>
            <Link style={linkStyle} to="/about">about</Link>
            <Link style={linkStyle} to="/new">create new</Link>
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/about" render={() => <About />} />
          <Route path="/new" render={() => <CreateNew addNew={addNew} />} />
          <Route path="/anecdotes/:id" render={() => <Anecdote anecdotes={anecdotes} />} />
        </div>
      </Router>
    )
  }

export default Menu