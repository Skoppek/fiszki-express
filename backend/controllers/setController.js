const asyncHandler = require('express-async-handler')

const Set = require('../models/setModel')
const Card = require('../models/cardModel')
const User = require('../models/userModel')

const createSet = asyncHandler(async (req, res) => {
    const user = User.findById(req.params.userId)

    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }

    req.body.user = req.params.userId

    const set = await Set.create(req.body)

    res.status(200).json(set)
})

const getSets = asyncHandler(async (req, res) => {
    const sets = await Set.find({ user: req.params.userId })

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

    const deletedCards = await Card.deleteMany({ set: req.params.id })

    const deletedSet = await Set.findByIdAndDelete(req.params.id)

    res.status(200).json(deletedSet + deletedCards)
})

module.exports = {
    getSets,
    getSet,
    createSet,
    updateSet,
    deleteSet,
}
