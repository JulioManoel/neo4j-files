import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { resolve } from 'path'
import { router as authRouter } from './routes/auth.routes.js'
import { router as userRouter } from './routes/user.routes.js'
import { router as fileRouter } from './routes/file.routes.js'
import { router as neo4jRouter } from './routes/neo4j.routes.js'
import { router as deviceRouter } from './routes/device.routes.js'
import { router as folderRouter } from './routes/folder.routes.js'
import { router as fileSystemRouter } from './routes/fileSystem.routes.js'

const app = express()
dotenv.config()

app.use(cors())

app.use(express.json())
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', fileRouter)
app.use('/api', neo4jRouter)
app.use('/api', deviceRouter)
app.use('/api', folderRouter)
app.use('/api', fileSystemRouter)
app.use('/files', express.static(resolve('uploads')))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
