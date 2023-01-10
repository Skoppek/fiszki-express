const express = require('express')
const router = express.Router({ mergeParams: true })
const { protect } = require('../middleware/authMiddleware')
const {
    createCard,
    getCards,
    getCard,
    updateCard,
    deleteCard,
} = require('../controllers/cardController')

router.route('/').get(getCards).post(createCard)
router
    .route('/:id')
    .get(getCard)
    .put(updateCard)
    .delete(deleteCard)

module.exports = router
