const express = require('express')
const characterRoutes = require('./character.routes')
const path = require('path')

const router = express.Router();

/* GET - Check service health */
router.get('/api', (req, res) =>
  res.send('API Server is running!')
)

router.use('/api/characters', characterRoutes)


module.exports = router
