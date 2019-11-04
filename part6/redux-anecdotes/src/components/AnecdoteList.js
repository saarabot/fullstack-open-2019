import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificateVote } from '../reducers/notificationReducer';
import Filter from './Filter';

const AnecdoteList = (props) => {
    let anecdotes = props.anecdotes

    const vote = (id, anectote) => {
        props.voteAnecdote(id);
        props.notificateVote(anectote);
    };

    return(
        <div>
        <Filter />
        <h2>Anecdotes</h2>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    console.log(filter)
    if(filter.input !== '') {
        anecdotes = anecdotes.filter((a) => {
            return a.content.toUpperCase().includes(filter.input.toUpperCase())
        })
    } 
    return anecdotes
}


const mapStateToProps = state => {
    return {
        anecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    notificateVote
}

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList);