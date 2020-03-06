import { combineReducers, createStore } from 'redux'
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

const store = createStore(
  rootReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => {
  saveState(store.getState())
})

export default store
