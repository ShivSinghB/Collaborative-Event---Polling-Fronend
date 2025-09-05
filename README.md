# 🎉 EventPoll Pro – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-pink.svg)](https://vitejs.dev/)

> ✨ **EventPoll Pro** is a collaborative platform to create events and engage participants through live polls.

---

## 🔗 GitHub Repository

📁 [Frontend Repository](https://github.com/ShivSinghB/Collaborative-Event---Polling-Fronend)

---

## 🚀 Features

### 🔐 Authentication
- Signup & Login functionality
- JWT token stored in `localStorage` for secure API access

### 🏠 Dashboard
- View events created by the user
- View events where the user is invited

### 🗳️ Poll Interaction
- Vote on active polls
- See real-time poll results

### 🧭 Responsive Navigation
- Role-based navbar (guest vs logged-in user)
- Mobile-friendly sidebar with GSAP animations

---

## ⚙️ Tech Stack

- **React + Vite**
- **TailwindCSS** for UI
- **GSAP** for animations
- **Axios** for HTTP requests
- **React Router v7** for navigation

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ShivSinghB/Collaborative-Event---Polling-Fronend.git
cd Collaborative-Event---Polling-Fronend

### 2. Install Dependencies
npm install

### 3. Create .env File
VITE_API_BASE_URL=http://localhost:5000/api

### 4. Start the Dev Server
npm run dev

App will run at: http://localhost:5173

### 🔁 Axios Setup (src/api.js)
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

### 📁 Folder Structure
CEPFONTEND/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images and icons
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state (Auth, etc.)
│   ├── pages/            # Route-level components
│   ├── services/         # API functions
│   ├── api.js            # Axios instance config
│   ├── App.jsx           # Main App with routes
│   ├── main.jsx          # Entry point
│   ├── index.css         # Tailwind base styles
│   └── Style.css         # Custom styles
├── .env                  # Environment variables
├── vite.config.js        # Vite config
├── tailwind.config.js    # Tailwind config
└── package.json

### 👨‍💻 Author

Shiv Baghel
🔗 [GitHub Profile](https://github.com/ShivSinghB)


---

### ✅ Tips:

- Isse `README.md` ke naam se save karo project ke root folder me.
- VS Code me Markdown preview dekhne ke liye `Ctrl + Shift + V` dabao.
- GitHub par push karne par bhi yahi format dikhai dega — professional aur clean.

Agar chaho to main **project ke screenshots**, **demo GIF**, ya **deployment badge** bhi add kar sakta hoon. Bata dena.
