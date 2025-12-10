import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 4000

// trust reverse proxy (Render)
app.set('trust proxy', 1)

// middleware
app.use(express.json())
app.use(cookieParser())

// CORS FIX for Netlify + local dev
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-auth-123.netlify.app', 
]

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
)

// database
connectDB()

app.get('/', (req, res) => {
  res.send('API Working 👌')
})

// routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server running on ${port}`))
