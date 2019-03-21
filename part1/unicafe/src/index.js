import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => {
    return(
        <button onClick={handleClick}>
            {text}
        </button>
    )
}

const Statistic = ({value, label}) => {
    return(
        <tr>
            <td>{label} </td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    if(props.all === 0) {
        return(
            <p>Ei yhtään palautetta annettu</p>
        )
    }
    return(
        <table>
        <tbody>
            <Statistic label="hyvä" value={props.good}/>
            <Statistic label="neutraali" value={props.neutral}/>
            <Statistic label="huono" value={props.bad}/>
            <Statistic label="yhteensä" value={props.all}/>
            <Statistic label="keskiarvo" value={(props.good + (-1*props.bad))/props.all}/>
            <Statistic label="positiivisia" value={props.good/props.all*100+" %"} />
        </tbody>
        </table>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [all, setAll] = useState(0);

    const goodFeedback = () => {
        setGood(good+1);
        setAll(all+1);
    }

    const neutralFeedback = () => {
        setNeutral(neutral+1);
        setAll(all+1);
    }

    const badFeedback = () =>{
        setBad(bad+1);
        setAll(all+1);
    }

    return(
        <div>
            <h1>Anna palautetta</h1>
            
            <Button text="hyvä" handleClick={goodFeedback}/>
            <Button text="neutraali" handleClick={neutralFeedback} />
            <Button text="huono" handleClick={badFeedback} />
            <h1>Statistiikka</h1>
            <Statistics all={all} good={good} neutral={neutral} bad={bad}/>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));


