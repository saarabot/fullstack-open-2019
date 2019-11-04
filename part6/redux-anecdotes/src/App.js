import React from 'react';
import {connect} from 'react-redux'
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

const App = (props) => {
  console.log(props)
  return (
    <div>
      
      <Notification />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: state.anecdotes,
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(App)