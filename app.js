const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62f4c061aae55e4545252637'
  };
  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);
app.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
