import React, { useState } from 'react'

const App = () => {
 
 const [username, setUsername] = useState('')
const [userData, setUserData] = useState(null)
const [repos, setRepos] = useState([])
const [loading, setLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState(null)
 const [roast, setRoast] = useState(null)
  return (
    <div>
      <h1>GitGraded</h1>
    </div>
  )
}

export default App
