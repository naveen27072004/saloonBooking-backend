const company_controller = require('../controller/company_controller')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const fileupload = require('../middleware/multer')

router.post('/',auth,fileupload.single('companyprofile'),company_controller.createcompany)
router.get('/',auth,company_controller.getcompany)
router.get('/user',auth,company_controller.getusercompany)
router.get('/:id',auth,company_controller.getcompanybyid)
router.put('/:id',auth,company_controller.updatecompanydetails)
router.delete('/:id',auth,company_controller.deletecompany)

module.exports = router