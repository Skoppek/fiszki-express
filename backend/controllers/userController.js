const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(req.body)

    if (!email || !password) {
        res.status(400)
        throw new Error('Please fill both email and password.')
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('Email already used.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    req.body.password = hashedPassword

    const newUser = await User.create(req.body)

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
            token: generateToken(newUser._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.cookie("logged-user", {
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        },{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict'
        })
        .status(200)
        .json({message: "Logged in successfully"})
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (!user.name) {
        res.status(400)
        throw new Error('User not found')
    }

    res.status(200).json({
        id: user._id,
        name: user.name
    })
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = {
    getUser,
    registerUser,
    loginUser,
}
