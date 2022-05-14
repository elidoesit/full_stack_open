const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

const url =
  `mongodb+srv://edahms:${password}@cluster1.d3qmu.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String,
  })

const Persons = mongoose.model('Person', personsSchema)

const persons = new Persons({
    name: 'Eli Dahms',
    number:'925-332-6073',
    id: '1',
})

  persons.save().then(result => {
    console.log('persons saved!')
    mongoose.connection.close()
  })


Persons.find({}).then(result => {
  result.forEach(persons => {
    console.log(persons)
  })
  mongoose.connection.close()
})
