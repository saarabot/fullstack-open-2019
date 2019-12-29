import React from 'react'
import { withRouter } from 'react-router-dom'

const AnecdoteList = (props) => {
    console.log(props)
    const displayAnecdote = (anecdote) => {
        props.history.push('anecdotes/'+anecdote.id)
    }

    const liStyle = {
        'textDecoration': 'underline',
        'cursor': 'pointer',
        'color': 'blue'
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        <ul>
            {props.anecdotes.map(anecdote => 
                <li style={liStyle} key={anecdote.id} onClick={() => displayAnecdote(anecdote)}><a>{anecdote.content}</a></li>
            )}
        </ul>
        </div>
        
    )
}

export default withRouter(AnecdoteList)