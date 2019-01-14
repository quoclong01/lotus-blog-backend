// Import dependencies
const express = require('express')
const router = express.Router()
const charCtrl = require('../controllers/character.controller')
const validate = require('express-validation')
const Validation = require('./documentation/characterApi')

/* GET all characters. */
router.get('/', charCtrl.index)

// /* Create a character. */
router.post('/', validate(Validation.addCharacterSchema), charCtrl.new)

/* Show a character. */
router.get('/:id', charCtrl.show)

/* Update age of a character. */
router.patch('/:id', charCtrl.updateAge)

/* Delete a character. */
router.delete('/:id', charCtrl.delete)

module.exports = router
