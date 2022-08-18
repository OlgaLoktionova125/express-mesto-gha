const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: 'Ошибка валидации данных' });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) res.send({ data: card });
      else {
        res.status(404).send({ message: 'Нет карточки с таким id' });
      }
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) res.status(400).send({ message: 'Некорректный id карточки' });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) res.send({ data: card });
    else {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    }
  })
  .catch((err) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) res.status(400).send({ message: 'Некорректный id карточки' });
    else res.status(500).send({ message: `Произошла ошибка ${err}` });
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card) res.send({ data: card });
    else {
      res.status(404).send({ message: 'Нет карточки с таким id' });
    }
  })
  .catch((err) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) res.status(400).send({ message: 'Некорректный id карточки' });
    else res.status(500).send({ message: `Произошла ошибка ${err}` });
  });

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
