const initialState = {
    action: '',
    anecdote: '',
    message: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADDED_ANECDOTE':
        return {
            ...initialState, 
            action: 'add',
            anecdote: action.data.content
        }
    case 'VOTED_ANECDOTE':
      console.log(action)
        
        return {
            ...initialState, 
            action: 'vote',
            message: action.message
        }
    case 'NULL':
      console.log('NULLLLL')
        return {...state, action: '', anecdote: '', message: ''};
    default:
      return state;
  }
}

export const notificateVote = (data, time) => {
  console.log(data)
  
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'NULL',
      })
    }, time * 1000);
    dispatch({
      type: 'VOTED_ANECDOTE',
      message: data,
      time: time
    })
  }
};

export const notificateAdd = (data, time) => {
  
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'NULL',
      })
    }, time * 1000);
    dispatch({
      type: 'ADDED_ANECDOTE',
      data
    })
  }
};

export const nullNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'NULL',
    })
  }
};
  

export default reducer