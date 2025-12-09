# 🚀 MERN Authentication App

Live Demo 👉 **https://mern-auth-123.netlify.app/**

A full-stack modern authentication system built using the MERN stack with email verification, secure JWT login, logout, protected routes, and more. Clean UI + full-stack OTP verification.

---

## 📸 Features
- 🔐 User Registration & Login  
- ✉️ Email OTP Verification  
- 🍪 HttpOnly Cookie Authentication  
- 🔒 Protected Routes  
- 🎨 Modern UI (React + Tailwind)  
- 🚀 Fully Responsive  
- 🌐 Frontend deployed on Netlify  
- 🛠️ Node.js + Express Backend  
- 📡 MongoDB Atlas Database  

---

## 🧭 Project Structure

project-folder/
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── context/
│ ├── assets/
│ └── App.jsx
└── package.json



---

## 🛠️ Installation & Setup

📦 Install Dependencies
▶️ Backend
```
cd backend
npm install
```
▶️ Frontend
```
cd frontend
npm install
```

🔧 Environment Variables

Create a .env file inside backend/:
```
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
SENDER_EMAIL=your_sender_email
PORT=4000
BREVO_API_KEY=your_brevo_api_key
```


Create a .env file inside frontend/:
```
VITE_BACKEND_URL=http://localhost:4000
```

🚀 Run the App
```
▶️ Start Backend
cd backend
npm run server
```
▶️ Start Frontend
```
cd frontend
npm run dev
```
⚙️ Tech Stack
Frontend

React

Tailwind CSS

Axios

React Router

React Toastify

Backend

Node.js

Express

MongoDB + Mongoose

Bcrypt

JSON Web Token

Nodemailer (Brevo)

🌐 Deployment
Frontend

Deployed on Netlify →
https://mern-auth-123.netlify.app/

Backend

Can be deployed on any hosting:

Railway

Render

Cyclic

VPS / Custom Server

📄 License

Free to use for learning, practicing, and personal projects.




