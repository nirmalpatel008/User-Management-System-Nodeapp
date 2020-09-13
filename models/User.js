const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
    unique: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    select: false,
  },
  // tokens: [
  // {
  token: {
    type: String,
  },
  //},
  //],
});
UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
UserSchema.methods.genUserToken = async function () {
  const user = this;
  console.log('inside gentoken');
  const token = jwt.sign({ _id: user._id.toString() }, 'secret', {
    expiresIn: 300,
  });
  //user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
UserSchema.pre('save', () => console.log('This is pre'));
module.exports = mongoose.model('User', UserSchema);
