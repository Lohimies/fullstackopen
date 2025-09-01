const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

function numberValidation(val) {
  if (val[2] === '-') {
    const sub1 = val.substring(0,1)
    const sub2 = val.substring(3)
    return (/^\d+$/.test(sub1) && /^\d+$/.test(sub2))
  }
  else if (val[3] === '-') {
    const sub1 = val.substring(0,2)
    const sub2 = val.substring(4)
    return (/^\d+$/.test(sub1) && /^\d+$/.test(sub2))
  }
  return (false)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: numberValidation,
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'User phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
