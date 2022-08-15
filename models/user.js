const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

userSchema.set('versionKey', false);

const User = mongoose.model('user', userSchema);

module.exports = User;
