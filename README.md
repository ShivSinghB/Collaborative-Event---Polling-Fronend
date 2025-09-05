
---

### **Frontend README.md** (`Collaborative-Event---Polling-Fronend/README.md`)

```markdown
# 🎉 EventPoll Pro – Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4+-pink.svg)](https://vitejs.dev/)

> Interactive frontend for **EventPoll Pro** – a collaborative platform to create events and participate in polls.

---

## 🔗 GitHub Repository

[Frontend Repo](https://github.com/ShivSinghB/Collaborative-Event---Polling-Fronend)

---

## 🚀 Features

### **Authentication**
- Signup and Login pages
- JWT token stored in `localStorage` for API calls

### **Dashboard**
- List of events created by the user
- List of events the user is invited to

### **Poll Interaction**
- Vote in polls for invited events
- View poll results dynamically

### **Responsive Navbar**
- Different navbar for guest vs logged-in users
- Mobile-friendly sidebar with GSAP animations

---

## ⚙️ Tech Stack

- React + Vite
- TailwindCSS + GSAP for UI animations
- Axios for API calls
- React Router v7

---

## 🛠 Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/ShivSinghB/Collaborative-Event---Polling-Fronend.git
cd Collaborative-Event---Polling-Fronend

2. Install dependencies

npm install

3. Create .env file in root:

VITE_API_BASE_URL=http://localhost:5000/api


4. Run locally

5. npm run dev

App will run at: http://localhost:5173

🔁 Axios Setup
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
├─ public/               # Static public files
├─ src/
│  ├─ assets/            # Images and icons
│  ├─ components/        # Reusable UI components
│  ├─ context/           # Global state (Auth, etc.)
│  ├─ pages/             # Route-level pages (Signup, Dashboard, etc.)
│  ├─ services/          # API functions (axios)
│  ├─ api.js             # Axios instance setup
│  ├─ App.jsx            # App with routes
│  ├─ main.jsx           # Entry point
│  ├─ index.css          # Tailwind base styles
│  └─ Style.css          # Custom styles
├─ .env                  # Environment variables
├─ vite.config.js        # Vite config
├─ tailwind.config.js    # Tailwind config
└─ package.json


🧑‍💻 Author

Shiv Baghel – [GitHub](https://github.com/ShivSinghB)

---

Shiv, these two README files are now **well-formatted, professional, and readable** with proper badges, syntax highlighting, and your GitHub links.  

If you want, I can also **add a beautiful visual diagram** for `User ↔ Event ↔ Poll` in the backend README to make it even more polished.  

Do you want me to do that next?
