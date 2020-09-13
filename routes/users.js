const express = require('express');
const passport = require('passport');
const taskRouter = require('./task');
const router = express.Router();
const auth = require('../middlewere/auth');
router.use('/:id/task', taskRouter);
const {
  // registerUser,
  loginUser,
  getUsers,
  registerUser,

  getUser,
  updateUser,
  deleteUser,
} = require('../controller/users');

router.post('/register', registerUser);
router.route('/login').post(loginUser);
router.get('/:id', getUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

router.get('/', auth, getUsers);

module.exports = router;
