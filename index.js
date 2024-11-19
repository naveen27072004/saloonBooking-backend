const express = require('express')
const connectDB = require('./config/dbconfig')
const app = express()
connectDB()
app.use(express.json())

const user_route = require('./routes/user_route')

app.use('/user',user_route)
PORT = 8000
app.listen(PORT,()=>{
    console.log(`your server is running ${PORT}`)
})