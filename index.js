const express = require('express')
const connectDB = require('./config/dbconfig')
const app = express()
connectDB()

app.get('/',(req,res)=>{
    res.send("hello express")
})

PORT = 8000
app.listen(PORT,()=>{
    console.log(`your server is running ${PORT}`)
})