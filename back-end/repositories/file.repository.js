import { driver } from '../config/neo4j.js'
import { modelType } from '../enum/modelType.js'
import BaseRepository from './base.repository.js'

export default class FileRepository extends BaseRepository {
  constructor() {
    super(modelType.FILE)
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
}