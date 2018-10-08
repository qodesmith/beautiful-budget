import { combineReducers, createStore, applyMiddleware, compose } from 'redux'

// Middlewares.
import fetchMiddeware from 'middleware/fetchMiddleware'

// Reducers.
import user from 'reducers/userReducer'


// Add all your custom middleware to this array.
const middlewareList = [fetchMiddeware]

// Add all your reducers to this object.
const rootReducer = combineReducers({ user })

// https://goo.gl/XRLgX8
// Using Redux DevTools extension? You should...
const composeEnhancers = !__PROD__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

// Create the Redux store in all its glory!
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewareList))
)

export default store
