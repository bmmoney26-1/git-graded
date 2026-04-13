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
setlLoading(false)
setErrorMessage("User Not found")
return
}
setUserData(data)

const reposData = await fetch(`https://api.github.com/users/${username}/repos`) 

const reposQueue= await reposData.json()

setRepos(reposQueue)

const prompt = ` Here is a GitHub user's profile data. Roast them 
like this: You should make a meaningful roast like a friend who
 cares but is being critical. point out what you think needs 
 improvement from work ethic, skill stacks, filling out the bio
  better, contribution history, how they could improve on their 
  repo naming, point out the stargazers count, and based on 
  their repo descriptions. Make sure that the critique is not 
  brutal, but it is honest and in a jesting/banter-like manner. 
  We aren't here to hurt feelings so also explain what is actually
 impressive in all of those categories and encourage them even if 
 there is nothing impressive. If they have a very stacked account 
 still find ways to make banter with them like giving credit but
  still finding gaps to address (Like if there are some languages 
  that aren't in the repo stack. Even if you have to find the most
   out there language that no one really knows.) Explain to them 
   that your honesty is so that they can improve and acknowledge 
   the gaps that need to be addressed to have a fullstack engineer,
    frontend engineer, or backend engineer worthy GitHub account so
     they can see what they would need to work on to pursue their 
     career of choice. The goal is to let young engineers have a 
     best friend who is honest about where they need to improve to
      remind them to be endlessly hungry, inspired, and always 
      curious to learn. As well as to be an encouraging friend 
      who lifts them up when they are doubting what they can do.
Username: ${data.login} Bio: ${data.bio} Followers:${data.followers} 
Public Repos: ${data.public_repos}
Repositories:
${reposQueue.map(repo => `- ${repo.name} | ${repo.language} | 
  ${repo.stargazers_count} | ${repo.description}`).join('\n')}`

  const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",
   max_tokens: 1000,
   messages:[{ role: "user", content: prompt}]
  })
})
const aiData = await response.json()

setRoast(aiData.content[0].text)
setLoading(false)

} 

 return (
  
    <div>
      <h1>GitGraded</h1>
    </div>
  )
}

export default App
