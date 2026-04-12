import React, { useState } from 'react'

const App = () => {
 
 const [username, setUsername] = useState('')
const [userData, setUserData] = useState(null)
const [repos, setRepos] = useState([])
const [loading, setLoading] = useState(false)
const [errorMessage, setErrorMessage] = useState(null)
 const [roast, setRoast] = useState(null)
  
 const fetchUser = async() => {
  setLoading(true)
setUserData(null)
setRepos([])
setErrorMessage(null)
setRoast(null)

const accountData = await fetch(`https://api.github.com/users/${username}`)
const data = await accountData.json()

if(data.message === "Not Found"){
setlLoadting(false)
setErrorMessage("User Not found")
return
}
setUserData(data)

const reposData = await fetch(`https://api.github.com/users/${username}/repos`) 

const reposQueue= await reposData.json()

setRepos(reposQueue)
} 

 return (
  
    <div>
      <h1>GitGraded</h1>
    </div>
  )
}

export default App
