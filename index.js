const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("hello express")
})

PORT = 8000
app.listen(PORT,()=>{
    console.log(`your server is running ${PORT}`)
})