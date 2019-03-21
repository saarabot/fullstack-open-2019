import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    console.log('hello from component');
    const now = new Date();
    const a = 10;
    const b = 20;
    const name="Pertti";
    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Olavi" age={a+b}/>
            <Hello name={name} age={b}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));


