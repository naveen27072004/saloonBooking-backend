const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyname: { type: String, required: true },
    companydesc: { type: String, required: true },
    companyprofile: { type: String},
    companyhighlight: [ {
        title: { type: String },
        titleprofile: { type: String },
        items: [ { type: String } ]
    }],
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;