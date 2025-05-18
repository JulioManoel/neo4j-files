import { driver } from '../config/neo4j.js'
import seeders from './seeders/index.js'
import constraints from './constraints/index.js'

const session = driver.session()

async function setupConstraints() {
  try {
    console.log('🔧 Criando constraints no Neo4j...')
    for (const query of constraints) {
      await session.run(query)
    }
    console.log('✅ Constraints criadas com sucesso!')

    console.log('🌱 Executando seeders...')
    for (const seeder of seeders) {
      await seeder(session)
    }
    console.log('✅ Seeders executados com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao criar constraints:', error)
  } finally {
    await session.close()
    await driver.close()
  }
}

setupConstraints()