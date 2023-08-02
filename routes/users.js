
const express = require('express');
const { login, signup, forgotPassword, resetPassword } = require('../controllers/users');


const router = express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/forgot/password',forgotPassword)
router.post('/reset/password/:token',resetPassword)

module.exports = router;