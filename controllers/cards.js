const card = require('../models/card');

const getCards = (req, res) => {
  card.find({})
    .then((cards) => {
      res.send({data: cards});
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  card.create({name, link, owner: req.user._id })
    .then((card) => res.send({data: card}))
    .catch((err) => {
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params._id)
    .then((card) => {
      res.send({data: card});
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err.name} ${err.message}`);
    });
};

const likeCard = (req, res) => card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true }
);

const dislikeCard = (req, res) => card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true }
);

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }