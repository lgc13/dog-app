import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DogScreen from './DogScreen'

const HomeScreen = () => {
  const history = useHistory()
  const isLoggedIn = useSelector(state => state.isLoggedIn)
  console.log('isLoggedIn: ', isLoggedIn)
  if (!isLoggedIn) history.push('/login')

  return <DogScreen />
}

export default HomeScreen
