var mongoose = require('mongoose')

var membersSchema =  mongoose.Schema({
    coach : {type: Boolean, default: false},
    name : {type: String},
    email: {type: String},
    desc: {type: String},
    skills: [],
    role: []
})

module.exports = mongoose.model('Members', membersSchema)