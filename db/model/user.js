const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    birthDate: {type: Date, required: true},
    disabled: {type: Boolean, required: true},
    locations: [JSON]
})

const User = model('User', userSchema)

module.exports = User