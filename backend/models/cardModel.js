const mongoose = require('mongoose')

const Set = require('./setModel')

const cardSchema = mongoose.Schema({
    set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Set,
        required: [true, 'Card has to be attached to set!'],
    },
    known: {
        main: {
            type: String,
            required: true
        },
        secondary: {
            type: String,
            required: false
        }
    },
    target: {
        main: {
            type: String,
            required: true
        },
        secondary: {
            type: String,
            required: false
        },
        sentences: {
            type: [String],
            required: false
        }
    }

})

module.exports = mongoose.model('Card', cardSchema)
