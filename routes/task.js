const express = require('express');
const passport = require('passport');
const auth = require('../middlewere/auth');
const router = express.Router({ mergeParams: true });
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controller/task');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
