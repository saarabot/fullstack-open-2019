import userService from '../services/users'

const reducer = (state = [], action) => {
    console.log(action)
  switch(action.type) {
    case 'GET_USERS':
        return action.data
    case 'GET_USER':
        return action.data
    default:
      return state;
  }
}


  export const getUsers = () => {
    return async (dispatch) => {
      const data = await userService.getAll()
      console.log(data)
        dispatch({
            type: 'GET_USERS',
            data
        })
    }
  };


export const getUser = (id) => {
    console.log('git user')
    return async dispatch => {
        const user = await userService.get(id)
        dispatch({
            type: 'GET_USER',
            data: user
        })
  }
};

export default reducer