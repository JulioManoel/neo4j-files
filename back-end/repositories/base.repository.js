import { driver } from '../config/neo4j.js'

export default class BaseRepository {
  constructor(label) {
    if (!label) throw new Error('Neo4j label must be provided.')
    this.label = label
  }

  async create(properties) {
    const session = driver.session()

    try {
      const query = `
        CREATE (n:${this.label} $properties)
        RETURN n
      `

      const result = await session.run(query, { properties })
      const node = result.records[0]?.get('n')

      return node?.properties ?? null
    } finally {
      await session.close()
    }
  }

  async findById(id) {
    const session = driver.session()

    try {
      const query = `
        MATCH (n:${this.label} {id: $id})
        RETURN n
      `

      const result = await session.run(query, { id })
      const node = result.records[0]?.get('n')

      return node?.properties ?? null
    } finally {
      await session.close()
    }
  }

  async findAll() {
    const session = driver.session()

    try {
      const query = `
        MATCH (n:${this.label})
        RETURN n
      `

      const result = await session.run(query)

      return result.records.map((record) => record.get('n').properties)
    } finally {
      await session.close()
    }
  }

  async updateById(id, updates) {
    const session = driver.session()

    try {
      const query = `
        MATCH (n:${this.label} {id: $id})
        SET n += $updates
        RETURN n
      `

      const result = await session.run(query, { id, updates })
      const node = result.records[0]?.get('n')

      return node?.properties ?? null
    } finally {
      await session.close()
    }
  }

  async deleteById(id) {
    const session = driver.session()

    try {
      const query = `
        MATCH (u:${this.label} {id: $id})
        DETACH DELETE u
        RETURN COUNT(u) AS deletedCount
      `

      const result = await session.run(query, { id })
      const deletedCount = result.records[0].get('deletedCount').toInt()
      return deletedCount > 0;
    } finally {
      await session.close();
    }
  }
}