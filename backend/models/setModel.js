const mongoose = require('mongoose')

const User = require('./userModel')

const setSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'User is required!'],
            ref: User
        },
        name: {
            type: String,
            required: [true, 'Set name is required!'],
        },
        desc: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Set', setSchema)
