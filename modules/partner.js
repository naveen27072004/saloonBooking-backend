const mongoose = require('mongoose');


const partnerSchema = new mongoose.Schema({
    partnername:{type:String, required:true},
    partnerprofile:{type:String, required:true},
    reviews:[{
        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        review:{type:String},
        rating:{type:Number},
        createdAt:{type:Date, default:Date.now}
    }],
    bookings:[{
        userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        bookingDate:{type:Date},
        bookingTime:{type:String},
    }],
    requeststatus:[{
        companyId:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    }]
});


const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;