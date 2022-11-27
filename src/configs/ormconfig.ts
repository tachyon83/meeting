import { Place } from '../modules/Place'
import { User } from '../modules/User'

module.exports = {
  type: 'mysql',
  host: process.env.CLEARDB_HOST || process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3308,
  username: process.env.DB_USERNAME || process.env.CLEARDB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || process.env.CLEARDB_PASSWORD || '1234',
  database: process.env.DB_DATABASE || process.env.CLEARDB_DATABASE || 'test',
  synchronize: false,
  logging: false,
  entities: [Place, User],
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
}
