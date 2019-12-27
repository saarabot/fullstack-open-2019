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
            anecdote: action.data
        }
    case 'VOTED_ANECDOTE':

        return {
            ...initialState, 
            action: 'vote',
            anecdote: action.data
        }
    case 'NULL':
        return {...state, action: '', anecdote: '', message: ''};
    default:
      return state;
  }
}

//ACTIONS
export const notificateVote = (data) => {
  return {
    type: 'VOTED_ANECDOTE',
    data
  }
};

export const notificateAdd = (data) => {
  return {
    type: 'ADDED_ANECDOTE',
    data
  }
};

export const nullNotification = () => {
    return {
      type: 'NULL',
    }
  };
  

export default reducer