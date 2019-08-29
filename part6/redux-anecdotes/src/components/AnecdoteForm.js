import React from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
    const store = props.store;
    const add = (event) => {
        event.preventDefault();
        const value = event.target.anecdote.value;
        if(value) {
          store.dispatch(addAnecdote(value))
        }
        event.target.anecdote.value = '';
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

export default AnecdoteForm;