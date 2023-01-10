const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getUser,
    getUserSets,
    registerUser,
    loginUser,
} = require('../controllers/userController')


router.route('/').post(registerUser)
router.route('/:id').get(getUser)
router.route('/login').post(loginUser)
router.route('/:id/sets').get(getUserSets)

module.exports = router
