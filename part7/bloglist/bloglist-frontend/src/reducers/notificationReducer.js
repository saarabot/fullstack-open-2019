const initialState = {
    action: '',
    message: ''
};

const reducer = (state = initialState, action) => {
    console.log(action)
  switch(action.type) {
    case 'ADD':
        return {
            ...initialState,
            action: 'add',
            message: action.message
        }
    case 'ERROR':
        return {
            ...initialState,
            action: 'error',
            message: action.message
        }
    case 'NULL':
        return { ...state, action: '', message: '' };
    default:
      return state;
  }
}

//action creations
//add
//error
export const addNotification = (data, time = 5) => {
    return async dispatch => {
        setTimeout(() => {
            console.log('null')
            dispatch({
                type: 'NULL',
            })
        }, time * 1000);
        dispatch({
            type: 'ADD',
            message: data,
        })
    }
};

export const errorNotification = (data, time = 5) => {
  return async dispatch => {
        setTimeout(() => {
            dispatch({
                type: 'NULL',
            })
        }, time * 1000);
        dispatch({
            type: 'ERROR',
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