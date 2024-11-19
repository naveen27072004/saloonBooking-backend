const mongoose = require('mongoose')

const connectDB = async () => {
    const mongo_url = 'mongodb://localhost:27017/saloonBooking'
   const conn = await mongoose.connect(mongo_url)
   if(conn){
       console.log('Database connected')
    }else{
        console.log('Database connection failed')
    }
}
module.exports = connectDB
