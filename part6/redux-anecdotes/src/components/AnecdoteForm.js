import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { notificateAdd } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {

    const add = async (event) => {
        event.preventDefault();
        console.log(event.target.anecdote.value)
        const value = event.target.anecdote.value;
        if(value) {
            const newAnecdote = await anecdoteService.createNew(value);
            props.addAnecdote(newAnecdote)
            props.notificateAdd(newAnecdote)
        }
        //event.target.anecdote.value = '';
    }
    return(
        <div>
            <h2>Create new</h2>
            <form onSubmit={add}>
                <div><input name="anecdote"/></div>
                <button>create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    addAnecdote, notificateAdd
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);