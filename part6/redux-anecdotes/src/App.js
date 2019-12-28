import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { init } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
      props.init()
  }, [])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { init })(App)