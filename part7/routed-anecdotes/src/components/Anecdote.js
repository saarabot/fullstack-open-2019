import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

const Anecdote = (props) => {
    console.log(props)
    const anecdoteById = (id) => {
        return props.anecdotes.find(a => a.id === id)
    }
    const [anecdote, setAnecdote] = useState('');

    useEffect(() => {
        let temp = anecdoteById(props.match.params.id)
        setAnecdote(temp)
    }, [])

    if(anecdote !== undefined) {
        return (
            <div>
                <h1>{anecdote.content}</h1>
                <p>has {anecdote.votes} votes</p>
                <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
            </div>
        )
    } else {
        return(
            <div>
                ...
            </div>
        )
    }
}

export default withRouter(Anecdote)