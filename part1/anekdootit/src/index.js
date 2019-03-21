import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, label}) => {
    return (
        <button onClick={handleClick}>
            {label}
        </button>
    )
}

const MostVotes = ({anecdotes, votes}) => {
    let value = votes[0];
    let index = 0;
    votes.map((v,i) => {
        if(v>value) {
            value = v;
            index = i;
        }
    })
    return (
        <>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[index]}</p>
        <p>has {value} votes </p>
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState([0,0,0,0,0,0])

    const nextAnecdote = () => {
        setSelected(Math.floor(Math.random() * 6));
    }

    const voteAnecdote = (selected) => {
        const copy = [...votes];
        copy[selected] += 1;
        setVotes(copy);
    }

    return(
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p> has {votes[selected]} votes</p>
            <Button label="Next anecdote" handleClick={nextAnecdote} />
            <Button label="Vote" handleClick={() => voteAnecdote(selected)} />
            <MostVotes anecdotes={props.anecdotes} votes={votes} />
        </div>
    );
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

