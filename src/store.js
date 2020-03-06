import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

const isLoggedIn = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({
  isLoggedIn,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

export default store
