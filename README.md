# GitGraded

GitGraded is a full-stack React application that fetches a real GitHub user's public profile data and sends it to Claude (Anthropic's AI) for an honest, encouraging, and brutally funny roast. The goal is to help young developers understand where they stand, what needs work, and what is already impressive — delivered by an AI that feels like a best friend who actually cares.

## Tech Stack

- React + Vite (frontend)
- Node.js + Express (backend)
- GitHub REST API
- Anthropic Claude API

## How to Run Locally

**1. Clone the repo**
```bash
git clone https://github.com/bmmoney26-1/git-graded.git
cd git-graded
```

**2. Install frontend dependencies**
```bash
npm install
```

**3. Set up the backend**
```bash
cd server
npm install
```

**4. Add your Anthropic API key**

Create a `.env` file inside the `server` folder:

ANTHROPIC_API_KEY=your_api_key_here

**5. Start the backend server**
```bash
node index.js
```

**6. In a new terminal, start the frontend**
```bash
cd ..
npm run dev
```

**7. Open your browser**
http://localhost:5180

Enter any public GitHub username and click **Ready to Git Graded?**

## API Used

- **GitHub REST API** — https://docs.github.com/en/rest
- **Anthropic Claude API** — https://docs.anthropic.com

## Technical Challenge

The biggest challenge was incorporating the Anthropic AI API with no previous knowledge of how AI APIs work. This led to discovering CORS — a browser security policy that blocks direct API calls from a frontend app to external services. The fix required learning how to set up a small Express backend in Node.js to proxy the Claude API call. I broke down each step of the process one by one to understand the concept, and used the Anthropic API directly to avoid having to rewrite large sections of code.

## What's Next — V2 Roadmap

- **Would I Hire You?** — Claude plays a senior hiring manager and conducts a mock technical interview based on your real GitHub data, ending with a hiring verdict and score
- **Choose Your Showcase** — select your best repos to highlight before the roast
- **Talk Back** — have a back-and-forth conversation with Claude about your feedback