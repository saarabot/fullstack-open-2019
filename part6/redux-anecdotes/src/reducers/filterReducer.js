const initialState = {
    input: ''
};

const reducer = (state = initialState, action) => {
    console.log(action);
  switch(action.type) {
    case 'FILTER_ANECDOTES':
        console.log(action)
        return {
            ...initialState, 
            input: action.data.input
        }
    case 'NULL':
        return {...state, input: ''};
    default:
      return state;
  }
}

//ACTIONS
export const filter = (input) => {
    console.log('filter with: ', input)
  return {
    type: 'FILTER_ANECDOTES',
    data: { input }
  }
};

export default reducer