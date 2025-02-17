const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyname: { type: String, required: true },
    companyadress: { type: String, required: true },
    companyphone: { type: Number, required: true },
    companyphone2: { type: Number,},
    companyprofile: { type: String},
    companyhighlight: [ {
        title: { type: String },
        titleprofile: { type: String },
        items: [ { type: String } ]
    }],
    partnerjoinrequest :[{
        partnerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' },
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;