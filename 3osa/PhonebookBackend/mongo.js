const mongoose = require('mongoose')


if (process.argv.length < 3) {
  console.log('give password, name and number as arguments')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://lohikowski:${password}@cluster0.iqycpaw.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(person => {
      console.log(person.name, person.number)
    })
  mongoose.connection.close()
})
}

else if (process.argv.length === 5) {
  const personName = process.argv[3]
  const personNumber = process.argv[4]

  const person = new Person({
    name: `${personName}`,
    number: `${personNumber}`,
  })

  person.save().then(result => {
    console.log(`Added ${personName} with number ${personNumber} to phonebook.`)
    mongoose.connection.close()
  })
}

else {
  console.log("Wrong number of parameters")
}

