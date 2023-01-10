const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    const token = req.body.token

    if (!token) {
        res.sendStatus(403) // Forbidden - server understands the request but refuses to authorize it
        throw new Error('No token')
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Get user from the token
        req.user = await User.findById(decoded.id).select('-password')

        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }
