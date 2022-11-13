import { Place } from '../modules/Place/Place'

module.exports = {
  type: 'mysql',
  host: process.env.CLEARDB_HOST || process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3308,
  username: process.env.CLEARDB_USERNAME || 'root',
  password: process.env.CLEARDB_PASSWORD || '1234',
  database: process.env.CLEARDB_DATABASE || 'test',
  synchronize: false,
  logging: false,
  entities: [Place],
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
}
