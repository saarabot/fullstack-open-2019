import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './services/notes';
import { initializeNotes } from './reducers/noteReducer'

const App = (props) => {
  const store = props.store;

  const mainStyle = {
    padding: '20px',
    width: '80%',
    margin: 'auto'
  }

  useEffect(() => {
    noteService.getAll().then(notes => props.initializeNotes(notes));
  }, [])

  return(
      <div style={mainStyle}>
          <NewNote store={store} />
          <VisibilityFilter store={store}/>
          <Notes store={store} />
      </div>
  )
};

export default connect(null, { initializeNotes })(App);
