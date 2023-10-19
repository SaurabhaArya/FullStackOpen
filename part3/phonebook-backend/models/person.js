const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err))

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)