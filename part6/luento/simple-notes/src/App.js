import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {

  const mainStyle = {
    padding: '20px',
    width: '80%',
    margin: 'auto'
  }

  useEffect(() => {
    props.initializeNotes();
  }, [])

  return(
      <div style={mainStyle}>
          <NewNote />
          <VisibilityFilter />
          <Notes  />
      </div>
  )
};

export default connect(null, { initializeNotes })(App);
