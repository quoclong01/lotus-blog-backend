const express = require('express')
const characterRoutes = require('./character.routes')
const path = require('path')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../docs/swagger.json')

const router = express.Router();

/* API DOCS with swagger */
router.use('/apidocs', swaggerUi.serve);
router.get('/apidocs', swaggerUi.setup(swaggerDocument));

/* GET - Check service health */
router.get('/api', (req, res) =>
  res.send('API Server is running!')
)


router.use('/api/characters', characterRoutes)


module.exports = router
