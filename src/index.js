// Require the express framework and instantiate it
require('dotenv').config();
require('babel-core/register');
const cluster = require('cluster');
const workers = process.env.WORKERS || require('os').cpus().length
const app = require('./lib/express');
const mysql = require('mysql2/promise');

// Worker for unstopped api
if (cluster.isMaster  && !module.parent) {

  console.log('start cluster with %s workers', workers)
  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid)
  }
  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid)
    cluster.fork()
  });
  
} else {
  const models = require('./models')
  const config = require('./config')

  // Connect to DB
  const start = async () => {
    try {
      await models.sequelize.authenticate()
      console.log('Connected to SQL database:', config.db.dbName)
    }
    catch {
      console.error('Unable to connect to SQL database:',config.db.dbName)
    }
    await models.sequelize.sync()
    if (!module.parent) {
      app.listen(config.port, '0.0.0.0')
      app.on('listening', () => {
        console.log(`===================================`)
        console.log(`Server start at port ${config.port}`)
        console.log(`===================================`)
      });
      app.on('error', (e) => {
        console.error(`ERROR: ${e.message}`);
      });
    }
  }
  start()
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})

module.exports = app;
