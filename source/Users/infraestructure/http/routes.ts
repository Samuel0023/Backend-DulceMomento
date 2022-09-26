const express = require('express')
import { get, destroy, put } from './controllers/userController'
// const { authUserAdmin } = require('../middlewares/authUserAdmin')
// const { ownership } = require('../middlewares/ownership')

const router = express.Router()

router.get('/', authUserAdmin, get)
router.delete('/:id', ownership, destroy)
router.put('/:id', ownership, put)

module.exports = router
