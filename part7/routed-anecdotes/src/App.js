import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'

const anes = [{
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(anes)

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification('New anecdote '+anecdote.content+' was created!')
    setTimeout(() => {
      setNotification('')
    }, 10000)
  }

  useEffect(() => {
    console.log(anecdotes)
  }, [anecdotes])

  /*
  const anecdoteById = (id) => {
    return anecdotes.find(a => a.id === id)
  }

  
  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }*/
  
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu anecdotes={anecdotes} addNew={addNew}/>
      <Footer />
    </div>
  )
}

export default App;