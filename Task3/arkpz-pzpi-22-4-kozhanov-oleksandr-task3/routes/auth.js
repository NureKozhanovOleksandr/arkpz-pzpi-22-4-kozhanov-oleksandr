const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['admin', 'vet', 'owner'])
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

module.exports = router;