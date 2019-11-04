const initialState = {
    action: '',
    anecdote: '',
    message: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADDED_ANECDOTE':
        console.log(action)
        return {
            ...initialState, 
            action: 'add',
            anecdote: action.data.anecdote
        }
    case 'VOTED_ANECDOTE':

        return {
            ...initialState, 
            action: 'vote',
            anecdote: action.data.anecdote.content
        }
    case 'NULL':
        return {...state, action: '', anecdote: '', message: ''};
    default:
      return state;
  }
}

//ACTIONS
export const notificateVote = (anecdote) => {
  return {
    type: 'VOTED_ANECDOTE',
    data: { anecdote }
  }
};

export const notificateAdd = (anecdote) => {
  return {
    type: 'ADDED_ANECDOTE',
    data: { anecdote }
  }
};

export const nullNotification = () => {
    return {
      type: 'NULL',
    }
  };
  

export default reducer