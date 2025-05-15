import { driver } from '../config/neo4j.js'
import BaseRepository from './base.repository.js'

export default class UserRepository extends BaseRepository {
  constructor() {
    super('User')
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