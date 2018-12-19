// Require the fastify framework and instantiate it
require('dotenv').config();
const cluster = require('cluster');
const workers = process.env.WORKERS || require('os').cpus().length
const fastify = require('fastify')({
  logger: true
})

// Worker for unstopped api
if (cluster.isMaster) {
  console.log('start cluster with %s workers', workers)
  for (var i = 0; i < workers; ++i) {
    var worker = cluster.fork().process;
    console.log('worker %s started.', worker.pid)
  }
  cluster.on('exit', function(worker) {
    console.log('worker %s died. restart...', worker.process.pid)
    cluster.fork()
  });
}  else {
  const routes = require('./routes')
  const models = require('./models')
  const config = require('./config')

  // Import Swagger Options
  const swagger = require('./config/swagger')

  // Register Swagger
  fastify.register(require('fastify-swagger'), swagger.options)

  // Connect to DB
  if (!module.parent) {
    models.sequelize.authenticate().then(() => {
      console.log('Connected to SQL database:', config.db.db_name)
    })
    .catch(err => {
      console.error('Unable to connect to SQL database:',config.db.db_name, err)
    })
    if(config.env === 'dev') {
      models.sequelize.sync()
      //creates table if they do not already exist
      // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
    }
  }

  // Loop over each route
  routes.forEach((route, index) => {
    fastify.route(route)
  })

  // Run the server!
  const start = async () => {
    try {
      await fastify.listen(config.port)
      fastify.swagger()
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start()
}

process.on('uncaughtException', function (err) {
  console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
  console.error(err.stack)
  process.exit(1)
})
