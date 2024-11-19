const user_controller = require('../controller/user_controller');
const express = require('express');
const router = express.Router();

router.post('/newuser',user_controller.newUser);
router.post('/login',user_controller.loginUser);

module.exports = router;