const user = require('../models/user');

const getUsers = (req, res) => {
  user.find({})
    .then((users) => {
      res.send({data: users});
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const getUser = (req, res) => {
  user.findById(req.params.id).
    orFail(() => {
      throw new Error('Пользователь не найден');
    })
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const createUser = (req, res) => {
  user.create({...req.body})
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const updateUser = (req, res) => {
  user.findByIdAndUpdate(req.user._id, {
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar
  })
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const updateAvatar = (req, res) => {
  user.findByIdAndUpdate(req.user._id, {
    avatar: req.body.avatar
  })
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar };