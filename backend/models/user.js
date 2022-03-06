const mongoose = require('mongoose');
const User = mongoose.model('User',{
    rollno: { type: String },
    name: { type: String },
    dob: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    course: { type: String },
});

module.exports = User