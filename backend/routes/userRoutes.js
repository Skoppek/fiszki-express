const express = require('express')
const router = express.Router({mergeParams: true})
const { protect } = require('../middleware/authMiddleware')
const {
    getUser,
    registerUser,
    loginUser,
} = require('../controllers/userController')

const set = require('./setRoutes')

router.route('/').post(registerUser)
router.route('/:id').get(getUser)
router.route('/login').post(loginUser)

router.use('/:userId/sets', set)

module.exports = router
