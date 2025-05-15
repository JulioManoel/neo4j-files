import neo4j from 'neo4j-driver';

export default class Neo4jController {
  constructor() {
    this.testConnection = this.testConnection.bind(this);
  }

  async testConnection(req, res) {
    const URI = process.env.NEO4J_URI;
    const USER = process.env.NEO4J_USER;
    const PASSWORD = process.env.NEO4J_PASSWORD;

    let driver;

    try {
      driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
      const serverInfo = await driver.getServerInfo();

      return res.status(200).json({
        message: 'Conexão com Neo4j estabelecida com sucesso!',
        serverInfo
      });
    } catch (err) {
      console.error(`Erro na conexão com o Neo4j:`, err);
      return res.status(500).json({
        message: 'Erro ao conectar com o Neo4j.',
        error: err.message,
        cause: err.cause?.message || null
      });
    } finally {
      await driver?.close();
    }
  }
}