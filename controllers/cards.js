const card = require('../models/card');

const getCards = (req, res) => {
  card.find({})
    .populate('owner')
    .then((cards) => {
      res.send({data: cards});
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const createCard = (req, res) => {
  const { name, link, owner } = req.body;
  card.create({name, link, owner: req.user._id })
    .then((card) => res.send({data: card}))
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const deleteCard = (req, res) => {
  card.findByIdAndRemove(req.params.cardId)
  .then((card) => {
    if(card) res.send({data: card});
    else {
      res.status(404).send({message: 'Нет карточки с таким id'})
    }
  })
  .catch((err) => res.status(400).send({ message: `Некорректный id карточки` }));
};

const likeCard = (req, res) => card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if(card) res.send({data: card});
    else {
      res.status(404).send({message: 'Нет карточки с таким id'})
    }
  })
  .catch((err) => res.status(400).send({ message: `Некорректный id карточки` }));


const dislikeCard = (req, res) => card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true })
  .then((card) => {
    if(card) res.send({data: card});
    else {
      res.status(404).send({message: 'Нет карточки с таким id'})
    }
  })
  .catch((err) => res.status(400).send({ message: `Некорректный id карточки` }));

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard }