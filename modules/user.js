const mongoose = require('mongoose');
const Company = require('./company');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    Company:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    Partner:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }],
});
const User = mongoose.model('User', userSchema);
module.exports = User;