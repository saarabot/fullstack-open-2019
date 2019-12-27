import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import anecdoteService from './services/anecdotes';
import { init } from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anecdoteService.getAll().then(res => {
      props.init(res)
    })
  },[])

  return (
    <div>
      <Notification />
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

export default connect(mapStateToProps,{init})(App)