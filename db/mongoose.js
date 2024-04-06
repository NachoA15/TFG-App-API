require('dotenv').config()
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@nachocluster.2ftispq.mongodb.net/tfg?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to Mongo')
    })
    .catch((error) => {
        console.log('Error ocurred connecting Mongo: ', error)
    })

module.exports = mongoose