const express = require('express');
const userRoutes = require('./user.routes');

const router = express.Router();

/** GET / - Check service health */
router.get('/api', (req, res) =>
  res.send('OK man')
);

router.use('/api/users', userRoutes);


module.exports = router;
