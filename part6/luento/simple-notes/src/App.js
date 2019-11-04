import React from 'react';
import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';

const App = (props) => {
  const store = props.store;

  const mainStyle = {
    padding: '20px',
    width: '80%',
    margin: 'auto'
  }
  return(
      <div style={mainStyle}>
          <NewNote store={store} />
          <VisibilityFilter store={store}/>
          <Notes store={store} />
      </div>
  )
};

export default App;
