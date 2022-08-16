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
  user.findById(req.params.id)
    .then((user) => {
      if (user) res.send({ data: user });
      else {
        res.status(404).send({
          message: 'Нет пользователя с таким id',
        });
      }
    })
    .catch((err) => res.status(400).send({ message: `Некорректный id` }));
};

const createUser = (req, res) => {
  user.create({...req.body})
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `Произошла ошибка ${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
};

const updateUser = (req, res) => {
  const {name, about} = req.body;
  user.findByIdAndUpdate(req.user._id, { name, about }, {new: true, runValidators: true})
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Произошла ошибка ${err}` });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err}` });
      }
    });
};

const updateAvatar = (req, res) => {
  const {avatar} = req.body;
  user.findByIdAndUpdate(req.user._id, { avatar }, {new: true, runValidators: true})
    .then((user) => {
      res.send({data: user});
    })
    .catch((err) => {
      if (err.name === 'ValidationError') res.status(400).send({ message: `Произошла ошибка ${err}` });
      else res.status(500).send({ message: `Произошла ошибка ${err}` });
    });
}

module.exports = { getUsers, getUser, createUser, updateUser, updateAvatar };