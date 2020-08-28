import { Sequelize, Dialect } from 'sequelize';
import env from './vars';
const  {dbHost, dbName, dbUser, dbPassword, dbMaxPool, dbMinPool, dbAcquire, dbIdle} = env;

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

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
//   })
//   .forEach((file) => {
//     const model = db.sequelize.import(path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

export default db;