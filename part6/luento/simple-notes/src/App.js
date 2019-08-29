import React from 'react';
import './App.css';
import NewNote from './components/NewNote';
import Notes from './components/Notes';

const App = (props) => {
  const store = props.store;
  return(
      <div>
          <NewNote store={store} />
          <Notes store={store} />
      </div>
  )
};

export default App;
