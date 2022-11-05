import {Place} from "../modules/Place/Place";

module.exports = {
  type: 'mysql',
  host: process.env.CLEARDB_HOST || process.env.DB_HOST || 'localhost',
  port: 3308,
  username: process.env.CLEARDB_USERNAME || 'root2',
  password: process.env.CLEARDB_PASSWORD || '1234',
  database: process.env.CLEARDB_DATABASE || 'test',
  synchronize: true,
  logging: true,
  entities: [ Place ],
  migrations: [],
  subscribers: [],
  legacySpatialSupport: false,
}
