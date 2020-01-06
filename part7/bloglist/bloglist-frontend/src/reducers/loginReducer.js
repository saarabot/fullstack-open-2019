import loginService from '../services/login'

const reducer = (state = { logged: false }, action) => {
    console.log(action)
  switch(action.type) {
    case 'LOGIN':
        return { ...state, user: action.data, logged: true }
    case 'SET_USER':
        return { ...state, user: action.data, logged: true }
    case 'LOGOUT':
        return { ...state, user: undefined, logged: false }
    default:
      return state;
  }
}

export const login = (credentials) => {
    return async dispatch => {
        const data = await loginService.login(credentials)
        dispatch({
            type: 'LOGIN',
            data
        })
    }
};

export const logout = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
        })
    }
};

export const setUser = (data) => {
    return async dispatch => {
        dispatch({
            type: 'SET_USER',
            data
        })
    }
};




export default reducer