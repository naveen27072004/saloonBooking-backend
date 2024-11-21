const company_controller = require('../controller/company_controller')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/',auth,company_controller.createcompany)
router.get('/',auth,company_controller.getcompany)

module.exports = router