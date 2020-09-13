const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    if (!user) {
      return res.status(400).send({ success: false });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    res
      .status(200)
      .json({ success: true, data: user, msg: 'You are authorized' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: 'invalid email or password' });
    }

    // Check for User
    const user = await User.findOne({ email }).select('+password');
    const token = await user.genUserToken();

    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, msg: 'Unauthorized access' });
    }

    res.send({ user, token });
  } catch (err) {
    res.status(400).json({ success: false, msg: 'login failed' });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    let user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    const token = await user.genUserToken();
    res.status(201).send({ user, token }).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(400).json({ success: false, msg: 'User not found' });
    }
    user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    };
    User.findByIdAndUpdate(
      req.params.id,
      { $set: user },
      { new: true },
      (err, data) => {
        if (!err) {
          res.send(data);
        } else {
          console.log('error in update');
        }
      }
    );
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.send({ msg: 'user deleted' });
      } else {
        console.log('Error in Employee Delete');
      }
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
