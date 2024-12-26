const partnerController = require('../controller/partner_controller')
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const fileupload = require('../middleware/multer')
const company_controller = require('../controller/company_controller')

router.post('/',auth,fileupload.single('partnerprofile'),partnerController.createpartner);
router.get('/',auth,partnerController.getownpartner);
router.get('/:partnerid',partnerController.getpartnerbyid);
router.post('/:companyid',auth,partnerController.jointreqtocompany);


module.exports = router;