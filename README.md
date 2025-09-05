🎉 EventPoll Pro – Frontend








A modern frontend for EventPoll Pro – a collaborative event and polling platform built with React, Tailwind, and Vite.

🔗 GitHub Repository

🔗 Frontend Repository

🚀 Features
🧾 Authentication

Signup / Login with JWT-based auth

Token stored securely in localStorage

Protected routes based on login state

📅 Dashboard

See events you created

See events you're invited to

Real-time UI updates on changes

🗳️ Polling System

Participate in event polls

Visualize poll results live

Only invited users can vote

🧭 Navigation

Responsive navbar with animation

Sidebar toggle for mobile view

Smooth GSAP transitions

⚙️ Tech Stack
Technology	Usage
React 19	Frontend framework
Vite 7	Fast dev server + bundler
TailwindCSS	Utility-first CSS framework
GSAP	Animations
Axios	API calls
React Router	Client-side routing
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ShivSinghB/Collaborative-Event---Polling-Fronend.git
cd Collaborative-Event---Polling-Fronend

2️⃣ Install Dependencies
npm install

3️⃣ Create a .env File

In the root directory:

VITE_API_BASE_URL=https://your-backend-url.onrender.com/api


✅ Replace with your actual backend URL.

4️⃣ Run Locally
npm run dev


Visit: http://localhost:5173

🔁 Axios Setup

📄 src/api.js

import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

📂 Folder Structure
CEPFONTEND/
├─ public/               # Static files
├─ src/
│  ├─ assets/            # Images and icons
│  ├─ components/        # Navbar, forms, UI
│  ├─ context/           # Auth context
│  ├─ pages/             # Login, Signup, Dashboard, etc.
│  ├─ services/          # API functions
│  ├─ api.js             # Axios setup
│  ├─ App.jsx            # Main app + routes
│  ├─ main.jsx           # Entry point
│  ├─ index.css          # Global styles (Tailwind)
│  └─ Style.css          # Custom styles
├─ .env
├─ vite.config.js
├─ tailwind.config.js
└─ package.json

👤 Author

Shiv Baghel
📎 GitHub – ShivSinghB

💬 Feedback or Contributions?

Feel free to submit an Issue
 or a PR! Your contributions make this better 💜
