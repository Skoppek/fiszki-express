const express = require('express')
const router = express.Router({mergeParams: true})
const { protect } = require('../middleware/authMiddleware')
const {
    getSets,
    getSet,
    createSet,
    updateSet,
    deleteSet,
} = require('../controllers/setController')

const card = require('./cardRoutes')

router.route('/').get(getSets).post(createSet)
router
    .route('/:id')
    .get(getSet)
    .put(updateSet)
    .delete(deleteSet)

router.use('/:setId/cards', card)

module.exports = router
