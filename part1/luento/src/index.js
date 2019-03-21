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

const Display = ({ value }) => <div>{value}</div>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

const History = (props) => {
    if(props.allClicks.length === 0) {
        return (
            <div>
                sovellusta käytetään nappeja painelemalla
            </div>
        );
    }
    return (
        <div>
            näppäilyhistoria: {props.allClicks.join(' ')}
        </div>
    );
}

const App = (props) => {
    const [ counter, setCounter ] = useState(0);
    const [left, setLeft] = useState(0);
    const [right, setRight] = useState(0);
    /*const [clicks, setClicks] = useState({
        left: 0, right: 0
    });*/
    const [allClicks, setAll] = useState([]);
    const [value, setValue] = useState(10);

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
    const setLeftValue = () => {
        setAll(allClicks.concat('L')); 
        setLeft(left +1);
    };
    const setRightValue = () => {
        setAll(allClicks.concat('R'));
        setRight(right+1);
    }

    /*
    const handleLeftClick = () => {
        setClicks({ ...clicks, left: clicks.left +1});
    }

    const handleRightClick = () => {
        setClicks({ ...clicks, right: clicks.right +1});
    }
    */

    const hello = (who) => () => {
        console.log('hello', who);
    }

    const a = 10;
    const b = 20;
    const name="Pertti";
    /*Funktion palauttava funktio
    const setNewValue = newValue => () => {
        setValue(newValue);
    }*/
    const setNewValue = (newValue) => {
        setValue(newValue);
    }

    return (
        <div>
            <h1>Greetings</h1>
            <Hello name="Olavi" age={a+b}/>
            <Hello name={name} age={b}/>
            <Display value={counter} />
            <Button text="plus" handleClick={setToValue(counter+1)}/>
            <Button text="zero" handleClick={setToValue(0)}/>
            <Button text="minus" handleClick={setToValue(counter-1)}/>        
            <div style={{marginTop: '20px', border: '1px solid black', padding: '16px 16px', width:'20%', height: '50px'}}>
                <div style={{display: 'block',float: 'left'}}>
                    {left}
                    <Button text="left" handleClick={setLeftValue} />
                </div>
                <div style={{float: 'right'}}>
                    {right}
                    <Button text="right" handleClick={setRightValue} />
                </div>
                
            </div>
            <History allClicks={allClicks} />
            <button onClick={hello('function')}>Greet</button>
            <br/>
            <Display value={value} />
            <br/>
            <Button handleClick={() => setNewValue(1000)} text="tonni"/>
            <Button handleClick={() => setNewValue(0)} text="nollaa" />
            <Button handleClick={() => setNewValue(value +1)} text="kasvata"/>
        </div>
    )
}


ReactDOM.render(<App />, document.getElementById('root'));





