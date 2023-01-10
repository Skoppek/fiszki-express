const asyncHandler = require('express-async-handler')

const Set = require('../models/setModel')
const Card = require('../models/cardModel')
const User = require('../models/userModel')

const createSet = asyncHandler(async (req, res) => {
    const user = User.findById(req.user._id)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    req.body.user = req.user._id

    const set = await Set.create(req.body)

    res.status(200).json(set)
})

const getSets = asyncHandler(async (req, res) => {
    const sets = await Set.find()

    sets.forEach(async (set) => {
        const user = await User.findById(set.user)
        set.user = user;
    })

    res.status(200).json(sets)
})

const getSet = asyncHandler(async (req, res) => {
    const set = await Set.findById(req.params.id)

    if (!set) {
        res.status(400)
        throw new Error('Set not found')
    }

    res.status(200).json(set)
})


const updateSet = asyncHandler(async (req, res) => {
    const set = await Set.findById(req.params.id)

    // Check if set exists
    if (!set) {
        res.status(400)
        throw new Error('Set not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if user is the owner
    if (req.user._id != set.user) {
        res.status(403)
        throw new Error('Logged user is not the owner.')
    }

    const updatedSet = await Set.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedSet)
})

const deleteSet = asyncHandler(async (req, res) => {
    const set = await Set.findById(req.params.id)

    // Check if set exists
    if (!set) {
        res.status(400)
        throw new Error('Set not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Check if user is the owner
    if (req.user._id != set.user) {
        res.status(403)
        throw new Error('Logged user is not the owner.')
    }

    const deletedCards = await Card.deleteMany({ set: req.params.id })

    const deletedSet = await Set.findByIdAndDelete(req.params.id)

    deletedSet.cards = deletedCards

    res.status(200).json(deletedSet)
})

module.exports = {
    getSets,
    getSet,
    createSet,
    updateSet,
    deleteSet,
}
