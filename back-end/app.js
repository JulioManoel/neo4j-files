import express from 'express'
import cors from 'cors'
import { router as authRouter } from './routes/auth.routes.js'
import { router as userRouter } from './routes/user.routes.js'
import { router as neo4jRouter } from './routes/neo4j.routes.js'
import { router as deviceRouter } from './routes/device.routes.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(cors())

app.use(express.json())
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', neo4jRouter)
app.use('/api', deviceRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
