import React, { useState } from 'react';
import './App.css';
import useCounter from './hooks/counter';
import useField from './hooks/useField';

const App = (props) => {
  //const [counter, setCounter] = useState(0);
  const counter = useCounter();


  //const [name, setName] = useState('');
  const name = useField('text');
  const born = useField('date');
  const height = useField('number');
  //const [born, setBorn] = useState('');
  //const [height, setHeight] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {counter.value}
        </div>
      </header>
      <div>
        {/*<button onClick={() => setCounter(counter + 1 )}>*/}
        <button onClick={counter.increase}>
          Plus
        </button>
        {/*<button onClick={() => setCounter(counter - 1 )}>*/}
        <button onClick={counter.decrease}>
          Minus
        </button>
        {/*<button onClick={() => setCounter(0)}>*/}
        <button onClick={counter.zero}>
          Zero
        </button>
      </div>
      <header className="App-header">
        <div>
          <form>
            name:
            <input 
              {...name}
            />
            <br />
            birthdate:
            <input 
              {...born}
            />
            <br />
            height:
            <input 
              {...height}
            />
          </form>
          
          <div>
            {name.value} {born.value} {height.value}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
