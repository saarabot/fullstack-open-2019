import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//import reducers
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    login: loginReducer,
    notifications: notificationReducer,
    users: userReducer,
    blogs: blogReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store