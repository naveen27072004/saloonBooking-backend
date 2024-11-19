const user_controller = require('../controller/user_controller');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

router.post('/newuser',user_controller.newUser);
router.post('/login',user_controller.loginUser);
router.get('/verify',auth,user_controller.verifyUser);

module.exports = router;