import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
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

    axios.get(`${gatewayUrl}/api/dog/all`).then(res => {
      setDogs(res.data)
    })
  }, [])

  return (
    <div className="App">
      <p>Hello</p>
      <img src={doggo} alt="doggo" height={300} />
      <div>Dog service response:</div>
      {dogs.length > 0 &&
        dogs.map(dog => (
          <div key={dog.id}>
            <p>Dog name: {dog.name}</p>
            <p>Dog color: {dog.color}</p>
          </div>
        ))}
    </div>
  )
}

export default App
