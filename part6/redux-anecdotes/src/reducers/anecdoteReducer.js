import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
};

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      console.log(action.data)
      state = state.concat(action.data);
      return state;
    case 'ADD':
      console.log(action.data)
      state = state.concat(action.data);
      return state;
    case 'INIT': 
      return action.data;
    default:
      return state;
  }
}

//ACTIONS
export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
};

export const voteAnecdote = (id, votes) => {
  return async dispatch => {
    let newVotes = votes +1;
    console.log(newVotes)
    const newData = await anecdoteService.vote(id, newVotes)
    dispatch({
      type: 'VOTE',
      data: newData
    })
  }
};

export const addAnecdote = (content) => {
  return async dispatch => {
    const newData = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newData
    })
  }
};

export default reducer