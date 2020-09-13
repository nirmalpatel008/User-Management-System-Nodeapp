const mongoose = require('mongoose');
const Users = require('./User');
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  isCompleted: {
    type: Boolean,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
