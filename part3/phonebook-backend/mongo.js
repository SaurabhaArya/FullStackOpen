const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://aryasaurabha:${password}@saurabhacluster.sos6mmw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person
    .find({})
    .then(result => {
      console.log('Phonebook:')
      result.forEach(per => console.log(`${per.name} ${per.number}`))
      mongoose.connection.close()
    })
} else if (process.argv.length > 3) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person
    .save()
    .then(result => {
      console.log(`Added ${result.name} number ${result.number} to phonebook.`)
      mongoose.connection.close()
    })
}