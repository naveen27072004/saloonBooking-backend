const express = require('express')
const appindex = require('./app')
const connectDB = require('./config/dbconfig')
const app = express()
const cors = require('cors')
const path = require('path')
connectDB()
app.use(cors())
app.use(express.json())

app.use('/api',appindex)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


PORT = 8000
app.listen(PORT,()=>{
    console.log(`your server is running ${PORT}`)
})