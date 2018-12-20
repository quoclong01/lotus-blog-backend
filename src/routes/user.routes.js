// Import dependencies
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const validate = require('express-validation');
const Validation = require('./documentation/userApi');

/* GET all users. */
router.get('/', userCtrl.index);

/* Show a user. */
router.get('/:id', userCtrl.show);

// /* Create a user. */
router.post('/', validate(Validation.addUserSchema), userCtrl.new);

/* Update a user. */
router.put('/:id', userCtrl.update);

/* Delete a user. */
router.delete('/:id', userCtrl.delete);

module.exports = router
