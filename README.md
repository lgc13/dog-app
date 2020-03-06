# dog-app (api example)

## Using axios for API calls

```shell script
# add dependency
yarn add axios
```

```javascript
// import axios
import axios from 'axios'
```

- You can now use axios requests as per [here](https://github.com/axios/axios)

Example:

```javascript
axios.get('https://someUrl.com').then(response => console.log(response.data))
```

## Adding ENV files, and env variables

When using env variables (for example, for URLs), you can use the following:

### ~~I. Use different env files~~ - this violates the 12-factor's rule on [Config](https://12factor.net/config) - read step II 
   
   1. Create a .env file in the root dir (not in src/)
   
   2. Add any variables with the prefix `REACT_APP_`. Example:
   
   ```
   # in .env
   REACT_APP_GATEWAY_URL=https://some-gateway-url
   ```
   
   3. Add more .env files (different environments)
   
   ```
   # .env
   REACT_APP_GATEWAY_URL=https://some-gateway-url
   
   # .env.local
   REACT_APP_GATEWAY_URL=http://localhost:8080
   ```
   
   4. Rerun your app with the .env file you want
   
   ```bash
   yarn start .env
   # or
   yarn start .env.local
   ```
   
   5. Create custom app scripts in your package.json
   
   ```json
   {
   "scripts": {
       "start": "react-scripts start",
       "start-local": "react-scripts start .env.local" 
     }
   }
   ```
### II. Pass in env variables on build

You can pass it in through IntelliJ run config

## Redux

```shell script
# add needed dependencies
yarn add redux, react-redux
```

```javascript
// Create your store. This needs to be added to your app in the <Provider>

// store.js
import { combineReducers, createStore } from 'redux'

const isLoggedIn = (state = false, action) => { // this is a reducer
  switch (action.type) {
    case 'LOGIN':
      return true
    case 'LOGOUT':
      return false
    default:
      return state
  }
}

const rootReducer = combineReducers({  // any any reducers here
  isLoggedIn,
})

const store = createStore(  // this is your store that will be exported
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // this allows you to use the React Devtools
)
// React Devtools can help you debug on chrome. Link to download: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en

export default store
```

```javascript
// surround your app (either index.js or App.js) with a <Provider store={store}>

// App.js
import React from 'react'
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
  <Provider store={store}>
    // ... other components here
  </Provider>
)

export default App
```

### Local storage

- You can add localStorage to redux:

```javascript
// store.js
import { combineReducers, createStore } from 'redux'
import { loadState, saveState } from './localStorage'

const rootReducer = combineReducers({
 // ... reducers go here
})

const persistedState = loadState() // this loads your persistedState/preloadedState

const store = createStore(
  rootReducer,
  persistedState, // add it here
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

store.subscribe(() => { // this saves any state to your browsers localStorage
  saveState(store.getState())
})

export default store
```

```javascript
// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}
```

## React Router

```shell script
# add dependency
yarn add react-router-dom
```

```javascript
// set up your main Router

// App.js
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom' // main import
import { Provider } from 'react-redux'
import HomeScreen from './HomeScreen'
import ErrorScreen from './ErrorScreen'
import LoginScreen from './LoginScreen'
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        // any routes with the component you want to render
        <Route exact path="/" component={HomeScreen} /> 
        <Route path="/login" component={LoginScreen} />
        <Route component={ErrorScreen} />  // error screen that will default if no route is found
      </Switch>
    </Router>
  </Provider>
)

export default App
```

- Rerouting and hooks

```javascript
// HomeScreen.js
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DogScreen from './DogScreen'

const HomeScreen = () => {
  const history = useHistory()
  const isLoggedIn = useSelector(state => state.isLoggedIn) // redux variable for isLoggedIn
  
  if (!isLoggedIn) history.push('/login')  // if the user is not logged in, use the `history` to redirect them the the `/login` route

  return <DogScreen /> // otherwise, display the correct screen
}

export default HomeScreen
```

```javascript
// LoginScreen.js
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleOnClick = () => {  // this sets the isLoggedIn action in redux to TRUE
    dispatch({ type: 'LOGIN' })
    history.push('/')  // redirecting user to `/` again, which should let them through this time
  }
  return (
    <div>
      <div>LOGIN PAGE</div>
      <button onClick={handleOnClick}>CLICK ME</button>
    </div>
  )
}

export default LoginScreen
```