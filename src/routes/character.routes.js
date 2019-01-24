// Import dependencies
const express = require('express')
const router = express.Router()
const charCtrl = require('../controllers/character.controller')
const validate = require('express-validation')
const charSchema = require('../schema/character.schema')

/* GET all characters. */
router.get('/', charCtrl.index)

/* Create a character. */
router.post('/', validate(charSchema.addCharacter), charCtrl.new)

/* Show a character. */
router.get('/:id', charCtrl.show)

/* Update age of a character. */
router.patch('/:id', charCtrl.updateAge)

/* Delete a character. */
router.delete('/:id', charCtrl.delete)

module.exports = router
