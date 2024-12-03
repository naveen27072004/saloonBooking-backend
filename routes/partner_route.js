const partnerController = require('../controller/partner_controller')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const fileupload = require('../middleware/multer')

router.post('/',auth,fileupload.single('partnerprofile'),partnerController.createpartner);

module.exports = router;