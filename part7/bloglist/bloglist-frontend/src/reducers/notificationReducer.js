const initialState = {
    action: '',
    message: ''
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD':
        return {
            ...initialState,
            action: 'add',
            message: action.data
        }
    case 'ERROR':
        return {
            ...initialState,
            action: 'error',
            message: action.data
        }
    case 'NULL':
        return { ...state, action: '', message: '' };
    default:
      return state;
  }
}

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
            data,
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