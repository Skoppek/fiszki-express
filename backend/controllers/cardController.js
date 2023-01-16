const asyncHandler = require("express-async-handler");

const Card = require("../models/cardModel");
const Set = require("../models/setModel");

const createCard = asyncHandler(async (req, res) => {
  const set = Set.findById(req.params.setId);

  if (!set) {
    res.status(400);
    throw new Error("Set not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // attach set information
  req.body.set = req.params.setId;

  const newCard = await Card.create(req.body);

  res.status(200).json(newCard);
});

const getCards = asyncHandler(async (req, res) => {
  const cards = await Card.find({ set: req.params.setId });
  res.status(200).json(cards);
});

const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(400);
    throw new Error("Card not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCard);
});

const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id);

  if (!card) {
    res.status(400);
    throw new Error("Card not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  const deletedCard = await Card.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedCard);
});

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
