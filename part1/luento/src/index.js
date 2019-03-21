import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Hello = ({ name , age}) => {
    const bornYear = () => new Date().getFullYear() - age;
    return (
        <div>
            <p>Hello {name}, you are {age} years old</p>
            <p>So you were probably born {bornYear()}</p>
        </div>
    )
}

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

const App = (props) => {
    const [ counter, setCounter ] = useState(0);

    /*setTimeout(
        () => setCounter(counter + 1),
        1000
    );*/
    
    /*
    const increaseByOne = () => {
        setCounter(counter + 1);
    }

    const setToZero = () => {
        setCounter(0);
    }*/

    const setToValue = (value) => () => setCounter(value);

    const a = 10;
    const b = 20;
    const name="Pertti";

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Olavi" age={a+b}/>
            <Hello name={name} age={b}/>
            <Display counter={counter} />
            <Button text="plus" handleClick={setToValue(counter+1)}/>
            <Button text="zero" handleClick={setToValue(0)}/>
            <Button text="minus" handleClick={setToValue(counter-1)}/>        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));





