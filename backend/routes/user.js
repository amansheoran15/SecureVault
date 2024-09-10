const express = require('express');
const {login, register, logout} = require("../controllers/user/authController");
const {authenticate} = require("../middlewares/auth");
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/logout', authenticate, logout);

module.exports = router;