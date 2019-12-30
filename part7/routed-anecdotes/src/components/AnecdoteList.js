import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const AnecdoteList = (props) => {
    console.log(props)

    const liStyle = {
        'textDecoration': 'underline',
        'cursor': 'pointer',
        'color': 'blue'
    }

    return (
        <div>
        <h2>Anecdotes</h2>
        <Table striped celled>
            <Table.Body>
            {props.anecdotes.map(anecdote =>
                <Table.Row key={anecdote.id}>
                    <Table.Cell>
                        <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    </Table.Cell>
                </Table.Row>
                
            )}
            </Table.Body>
        </Table>
        
        </div>
        
    )
}

export default withRouter(AnecdoteList)