const express = require('express')
const app = express()
const router = express.Router()
const user_route = require('./routes/user_route')
const company_route = require('./routes/company_route')
const partner_route = require('./routes/partner_route')

app.use('/user',user_route)
app.use('/company',company_route)
app.use('/partner',partner_route)

module.exports = app

