import { driver } from '../config/neo4j.js'
import { modelType } from '../enum/modelType.js'
import BaseRepository from './base.repository.js'

export default class FolderRepository extends BaseRepository {
  constructor() {
    super(modelType.FOLDER)
  }

  async findAll(search) {
    const session = driver.session()

    try {
      let whereClause = ''

      if (search.search) {
        whereClause = `
              WHERE
                toLower(n.id) CONTAINS toLower($search) OR
                toLower(n.name) CONTAINS toLower($search)
            `
      }

      const query = `
              MATCH (n:${this.label})
              ${whereClause}
              RETURN n
          `

      const result = await session.run(query, search)
      return result.records.map(record => record.get('n').properties)
    } finally {
      await session.close()
    }
  }

  async create(folder, userId, deviceId) {
    const session = driver.session()

    try {
      const query = `
         MATCH (u:User {id: $userId})-[:CONNECTED_TO]->(d:Device {id: $deviceId})
        CREATE (f:Folder $folder)
        CREATE (u)-[:CREATED {timestamp: datetime()}]->(f)
        CREATE (d)-[:USED_IN_CREATION]->(f)
        RETURN f
      `

      const result = await session.run(query, { folder, userId, deviceId })
      return result.records[0].get('f').properties
    } finally {
      await session.close()
    }
  }
}