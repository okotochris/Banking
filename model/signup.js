const mongoose = require('mongoose')

data = new mongoose.Schema({
    Username:{
        requrie: true,
        type: String,
    },
    userName:{
        requrie: true,
        type: String,
    },
    accNum:{
        requrie: true,
        type: String,
    },
    email:{
        requrie: true,
        type: String,
    },
    accBal:{
        requrie: true,
        type: String,
    },
    picture:{
        requrie: true,
        type: String,
    },
    password:{
        requrie: true,
        type: String,
    }
}, {timestamps: true})

const signUp = mongoose.model('signUp', data)
module.exports = signUp;