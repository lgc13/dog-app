import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { loadState, saveState } from './localStorage'

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

const persistedState = loadState()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, persistedState)

store.subscribe(() => {
  saveState({
    isLoggedIn: store.getState().isLoggedIn,
  })
})

export default store
