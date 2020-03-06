import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleOnClick = () => {
    dispatch({ type: 'LOGIN' })
    history.push('/')
  }
  return (
    <div>
      <div>LOGIN PAGE</div>
      <button onClick={handleOnClick}>CLICK ME</button>
    </div>
  )
}

export default LoginScreen
