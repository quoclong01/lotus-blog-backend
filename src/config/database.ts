import { Sequelize, Dialect } from 'sequelize';
import env from './vars';
const  {env: nodeEnv, dbHost, dbName, dbUser, dbPassword, dbMaxPool, dbMinPool, dbAcquire, dbIdle} = env;

class Database {
  sequelize: any;
  host: string = dbHost || 'localhost';
  database: string = dbName;
  userName: string = dbUser;
  password: string = dbPassword || '';
  maxPool: number = +dbMaxPool || 5;
  minPool: number = +dbMinPool || 0;
  acquire: number = +dbAcquire || 30000;
  idle: number = +dbIdle || 10000;
  dialect: Dialect = 'postgres';
  [x:string]: any;

  constructor() {
    if (nodeEnv === 'production') {
      this.sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: this.dialect,
        // native: true,
        ssl: true, 
        dialectOptions: {
          ssl: true,
          rejectUnauthorized: false
        }
      });
    } else {
      this.sequelize = new Sequelize(this.database, this.userName, this.password, {
        host: this.host,
        dialect: this.dialect,
        // operatorsAliases: false,
        pool: {
          max: this.maxPool,
          min: this.minPool,
          acquire: this.acquire,
          idle: this.idle
        },
      });
    }
  }

  connect() {
    return this.sequelize.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
      });
  }
}

const db = new Database();

export default db;
