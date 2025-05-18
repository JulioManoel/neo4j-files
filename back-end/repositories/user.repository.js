import { driver } from '../config/neo4j.js'
import BaseRepository from './base.repository.js'

export default class UserRepository extends BaseRepository {
  constructor() {
    super('User')
  }

  async findAll(search) {
    const session = driver.session()

    try {
      let whereClause = ''

      if (search.search) {
        whereClause = `
          WHERE
            toLower(n.name) CONTAINS toLower($search) OR
            toLower(n.email) CONTAINS toLower($search) OR
            toLower(n.id) CONTAINS toLower($search)
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


  async findByEmail(email) {
    const session = driver.session()

    try {
      const query = `
        MATCH (u:User {email: $email})
        RETURN u
      `

      const result = await session.run(query, { email })
      const node = result.records[0]?.get('u')

      return node?.properties ?? null
    } finally {
      await session.close()
    }
  }
}