import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return + 1;
        case 'DECREMENT':
            return - 1;
        case 'ZERO':
            return 0;
        default:
            return state;
    };
};

const store = createStore(counterReducer);

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState());