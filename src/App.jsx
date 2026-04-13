import React, { useState } from 'react'
import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [userData, setUserData] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [roast, setRoast] = useState(null)

  const fetchUser = async () => {
    setLoading(true)
    setUserData(null)
    setRepos([])
    setErrorMessage(null)
    setRoast(null)

    const accountData = await fetch(`https://api.github.com/users/${username}`)
    const data = await accountData.json()

    if (data.message === 'Not Found') {
      setLoading(false)
      setErrorMessage('User not found. Check the username and try again.')
      return
    }

    setUserData(data)

    const reposData = await fetch(`https://api.github.com/users/${username}/repos`)
    const reposQueue = await reposData.json()
    setRepos(reposQueue)

    const prompt = `Here is a GitHub user's profile data. Roast them like this: You should make a meaningful roast like a friend who cares but is being critical. Point out what you think needs improvement from work ethic, skill stacks, filling out the bio better, contribution history, how they could improve on their repo naming, point out the stargazers count, and based on their repo descriptions. Make sure that the critique is not brutal, but it is honest and in a jesting/banter-like manner. We aren't here to hurt feelings so also explain what is actually impressive in all of those categories and encourage them even if there is nothing impressive. If they have a very stacked account still find ways to make banter with them like giving credit but still finding gaps to address. Explain to them that your honesty is so that they can improve and acknowledge the gaps that need to be addressed to have a fullstack engineer, frontend engineer, or backend engineer worthy GitHub account. The goal is to let young engineers have a best friend who is honest about where they need to improve to remind them to be endlessly hungry and inspired, always curious to learn. As well as to be an encouraging friend who lifts them up when they are doubting what they can do.

Username: ${data.login}
Bio: ${data.bio}
Followers: ${data.followers}
Public Repos: ${data.public_repos}
Repositories:
${reposQueue.map(repo => `- ${repo.name} | ${repo.language} | ⭐${repo.stargazers_count} | ${repo.description}`).join('\n')}`

    const response = await fetch('http://localhost:3001/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    const aiData = await response.json()
    setRoast(aiData.roast)
    setLoading(false)
  }

  return (
    <div className="app">
      <div className="hero">
        <h1 className="title">GitGraded</h1>
        <p className="subtitle">Welcome, friend. Just a heads up — we are pretty honest around here.</p>

        <div className="search-bar">
          <input
            className="search-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a GitHub username..."
            onKeyDown={(e) => e.key === 'Enter' && fetchUser()}
          />
          <button className="search-btn" onClick={fetchUser} disabled={loading}>
            {loading ? 'Grading...' : 'Ready to Git Graded?'}
          </button>
        </div>

        {errorMessage && (
          <p className="error">{errorMessage}</p>
        )}
      </div>

      {loading && (
        <div className="loading-card">
          <p className="loading-text">Pulling your receipts from GitHub...</p>
          <p className="loading-subtext">The verdict is loading. Brace yourself.</p>
        </div>
      )}

      {userData && roast && !loading && (
        <div className="results">
          <div className="profile-card">
            <img className="avatar" src={userData.avatar_url} alt={userData.login} />
            <div className="profile-info">
              <h2 className="profile-name">{userData.name || userData.login}</h2>
              <p className="profile-bio">{userData.bio || 'No bio. First strike.'}</p>
              <div className="profile-stats">
                <span>⭐ {userData.public_repos} repos</span>
                <span>👥 {userData.followers} followers</span>
                <span>👣 {userData.following} following</span>
              </div>
            </div>
          </div>

          <div className="roast-card">
            <h3 className="roast-title">Your GitGrade</h3>
            <p className="roast-text">{roast}</p>
          </div>

          <div className="repos-section">
            <h3 className="repos-title">Repos Under Review</h3>
            <div className="repos-grid">
              {repos.slice(0, 6).map(repo => (
                <div key={repo.id} className="repo-card">
                  <p className="repo-name">{repo.name}</p>
                  <p className="repo-lang">{repo.language || 'No language'}</p>
                  <p className="repo-desc">{repo.description || 'No description. Tsk tsk.'}</p>
                  <p className="repo-stars">⭐ {repo.stargazers_count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App