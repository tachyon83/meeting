import { Place } from '../modules/Place'
import { User } from '../modules/User'
import { Favorite } from '../modules/Favorite'
require('dotenv').config()

module.exports = {
  type: 'mysql',
  host: process.env.CLEARDB_HOST || process.env.DB_HOST,
  port: process.env.DB_PORT || 3308,
  username: process.env.DB_USERNAME || process.env.CLEARDB_USERNAME,
  password: process.env.DB_PASSWORD || process.env.CLEARDB_PASSWORD,
  database: process.env.DB_DATABASE || process.env.CLEARDB_DATABASE,
  synchronize: false,
  logging: false,
  entities: [Favorite, Place, User],
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
}
