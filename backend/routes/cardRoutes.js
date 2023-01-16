const express = require("express");
const router = express.Router({ mergeParams: true });
const { protect } = require("../middleware/authMiddleware");
const {
  createCard,
  getCards,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

router.route("/").get(getCards).post(protect, createCard);
router.route("/:id").put(protect, updateCard).delete(protect, deleteCard);

module.exports = router;
