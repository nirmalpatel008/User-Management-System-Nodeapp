const Task = require('../models/Task');
const User = require('../models/User');

exports.getTasks = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    const tasks = await Task.find();
    res
      .status(200)
      .json({ success: true, data: tasks, msg: 'you are authorized' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOne({ _id, userId });
    if (!task) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.createTask = async (req, res, next) => {
  try {
    req.body.userId = req.params.id;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ success: false });
    }
    const task = await Task.create(req.body);
    res
      .status(201)
      .json({ success: true, data: task, msg: 'you are authorized' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(400).json({ success: false });
    }
    task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!task) {
      return res.status(400).json({ success: false });
    }
    res
      .status(200)
      .json({ success: true, data: {}, msg: 'you are authorized' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
