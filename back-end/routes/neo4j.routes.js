import { Router } from 'express'
import Neo4jController from '../controllers/neo4j.controller.js'

export const router = Router()
const controller = new Neo4jController()

router.get('/test-connection', controller.testConnection)