# 🚀 MERN Authentication App

Live Demo on netlify👉 **https://mern-auth-123.netlify.app/**  
Live Demo on AWS EC2👉 **https://auth.wmavishka.me/** 

(NOTE-: To avoid unnecessary cloud costs, the EC2 instance is **not kept running continuously**.)

A production-ready full-stack authentication system built using the **MERN stack**, fully **Dockerized** and **deployed on AWS EC2** with **Nginx reverse proxy** and **SSL **.

Includes email OTP verification, secure JWT authentication, HttpOnly cookies, protected routes, and modern UI.

---

## 📸 Features
- 🔐 User Registration & Login  
- ✉️ Email OTP Verification  
- 🍪 HttpOnly Cookie Authentication  
- 🔒 Protected Routes  
- 🔑 JWT-based Auth Flow  
- 🎨 Modern UI (React + Tailwind)  
- 🚀 Fully Responsive  
- 🐳 Dockerized Frontend & Backend  
- 🌐 Nginx Reverse Proxy  
- 🔐 HTTPS with Let’s Encrypt (Certbot)  
- ☁️ Deployed on AWS EC2  
- 📡 MongoDB Atlas Database  

---

## 🧠 Architecture Overview
---
Browser (HTTPS)
↓
Nginx (SSL Termination)
↓
MongoDB Atlas
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

## 🔧 Environment Variables

### Backend (`backend/.env`)
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

### Frontend (`frontend/.env`)

```
VITE_BACKEND_URL=http://localhost:4000
```

▶️ Start Backend

```
npm run server
```

▶️ Start Frontend

```
npm run dev
```


## 🐳 Docker Setup (Production-style)

Build and run containers:
```
docker compose up -d --build
```

---
Services:
- Backend container (Node.js)
- Nginx reverse proxy
- Environment-based configuration

---

## ⚙️ Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Axios  
- React Router  
- React Toastify  

---


### Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- Bcrypt  
- JSON Web Token (JWT)  
- Nodemailer (Brevo)  

---


### DevOps / Infrastructure
- Docker & Docker Compose  
- Nginx  
- AWS EC2  
- Let’s Encrypt (Certbot)  
- OpenSSL  


## 🌐 Deployment


- Hosted on **AWS EC2**
- Reverse proxied via **Nginx**
- Secured with **HTTPS **
- Dockerized for consistency and portability

---

## 🔐 Security Highlights


- HttpOnly cookies (XSS protection)
- HTTPS enforced
- JWT authentication
- Environment-based secrets


---

## 📄 License
Free to use for learning, practicing, and personal projects.
