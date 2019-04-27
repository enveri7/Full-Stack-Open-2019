import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    loggedUser: loggedUserReducer,
    users: usersReducer
  })

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
