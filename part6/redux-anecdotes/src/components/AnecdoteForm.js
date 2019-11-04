import React from 'react';
import { connect } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { notificateAdd } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

    const add = (event) => {
        event.preventDefault();
        const value = event.target.anecdote.value;
        if(value) {
          props.addAnecdote(value)
          props.notificateAdd(value)
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

const mapDispatchToProps = {
    addAnecdote, notificateAdd
}

export default connect(null, mapDispatchToProps)(AnecdoteForm);