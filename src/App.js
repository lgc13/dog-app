import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import HomeScreen from './HomeScreen'
import ErrorScreen from './ErrorScreen'
import LoginScreen from './LoginScreen'
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route component={ErrorScreen} />
      </Switch>
    </Router>
  </Provider>
)

export default App
