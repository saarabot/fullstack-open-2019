import React from 'react';
import './App.css';

import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'ZERO':
            return 0;
        default:
            return state;
    };
};

const store = createStore(counterReducer);

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {store.getState()}
        </div>
        <div>
          <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>+</button>
        </div>
      </header>
    </div>
  );
}

export default App;
