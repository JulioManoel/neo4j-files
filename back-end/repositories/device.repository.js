import { driver } from '../config/neo4j.js'
import BaseRepository from './base.repository.js'

export default class DeviceRepository extends BaseRepository {
    constructor () {
        super('Device')
    }

    async findAll(search) {
        const session = driver.session()
    
        try {
          let whereClause = ''
    
          if (search.search) {
            whereClause = `
              WHERE
                toLower(n.ip) CONTAINS toLower($search) OR
                toLower(n.language) CONTAINS toLower($search) OR
                toLower(n.id) CONTAINS toLower($search) OR
                toLower(n.platform) CONTAINS toLower($search) OR
                toLower(n.brower) CONTAINS toLower($search)
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