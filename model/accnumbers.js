const mongoose = require('mongoose');

const data = mongoose.Schema({
    accName:{
        type: String,
        require: true
    },
    accNum:{
        type: String,
        require: true
    },
    bank:{
        type: String,
        require: true
    },
    store:{type: String}
}, {timestamps: true})

const accDetails = mongoose.model('accDetails', data)

module.exports = accDetails;