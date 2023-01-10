const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Username is required!'],
        },
        email: {
            type: String,
            required: [true, 'User email is required!'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'User password is required!'],
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)
