const mongoose = require('mongoose');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) res.send({ data: user });
      else {
        res.status(404).send({
          message: 'Нет пользователя с таким id',
        });
      }
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.cardId)) res.status(400).send({ message: 'Некорректный id пользователя' });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const createUser = (req, res) => {
  User.create({ ...req.body })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: 'Ошибка валидации данных' });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (!mongoose.Types.ObjectId.isValid(req.params.cardId) || err.name === 'ValidationError') res.status(400).send({ message: 'Ошибка валидации данных' });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

module.exports = {
  getUsers, getUser, createUser, updateUser, updateAvatar,
};
