import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'

const app = express()
const port = Number(process.env.PORT) || 4000

// trust reverse proxy (Render / Codespaces)
app.set('trust proxy', 1)

// middleware
app.use(express.json())
app.use(cookieParser())

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://backend:4000',
  'http://54.206.96.119',
  'https://auth.wmavishka.me',
  'https://mern-auth-123.netlify.app',
  'https://urban-meme-jj5r79wwgpvphqgpw-5173.app.github.dev',
]

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

// routes
app.get('/', (req, res) => {
  res.send('API Working')
})

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

// 🚨 START SERVER ONLY AFTER DB CONNECTS
const startServer = async () => {
  try {
    await connectDB()

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on ${port}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
