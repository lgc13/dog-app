import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const DogScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [doggo, setDoggo] = useState(null)
  const [dogs, setDogs] = useState([])

  useEffect(() => {
    axios
      .get('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        setDoggo(response.data.message)
      })
      .catch(error => {
        console.log('Error fetching dog picture: ', error)
      })

    const gatewayUrl = process.env.REACT_APP_GATEWAY_URL

    console.log('gatewayUrl: ', gatewayUrl)
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)

    axios.get(`${gatewayUrl}/api/dogs`).then(res => {
      setDogs(res.data)
    })
  }, [])

  const handleLogoutClick = () => {
    console.log('Logging out...')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="App">
      <img src={doggo} alt="doggo" height={300} />
      <div>Dog service response:</div>
      {dogs.length > 0 &&
        dogs.map(dog => (
          <div key={dog.id}>
            <p>Dog name: {dog.name}</p>
            <p>Dog color: {dog.color}</p>
          </div>
        ))}
      <button onClick={handleLogoutClick}>LOG OUT</button>
    </div>
  )
}

export default DogScreen
