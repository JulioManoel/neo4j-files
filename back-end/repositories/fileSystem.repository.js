import { driver } from '../config/neo4j.js'

export default class FileSystemRepository {
    async findAll(search) {
        const session = driver.session()

        try {
            let whereClause = ''

            if (search.search) {
                whereClause = `
                    WHERE toLower(n.name) CONTAINS toLower($search)
                `
            }

            const query = `
                MATCH (n)
                ${whereClause}
                WITH n, labels(n) AS labels
                RETURN
                    collect(CASE WHEN 'Folder' IN labels THEN n END) AS folders,
                    collect(CASE WHEN 'File' IN labels THEN n END) AS files
            `

            const result = await session.run(query, search)
            const record = result.records[0]

            return {
                folders: record.get('folders').map(node => node.properties),
                files: record.get('files').map(node => node.properties),
            }
        } finally {
            await session.close()
        }
    }
}