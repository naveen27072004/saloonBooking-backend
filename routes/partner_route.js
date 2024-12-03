const partnerController = require('../controller/partner_controller')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const fileupload = require('../middleware/multer')

router.post('/',auth,fileupload.single('partnerprofile'),partnerController.createpartner);
router.get('/',auth,partnerController.getownpartner);
router.get('/:partnerid',partnerController.getpartnerbyid);
router.post('/:companyid',auth,partnerController.jointreqtocompany);
router.get('/status',auth,partnerController.checkjointreqststus);

module.exports = router;