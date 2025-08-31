require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/phonebookEntry')

const app = express()
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req, res) => {
  if (req.method === "POST") {
    return (JSON.stringify(req.body))
  }
  else {
    return("-")
  }
})

app.use(morgan(':method :url :status :response-time ms :req[content-length] :res[content-length] :body'));

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//This is a info call for the amount of entries in the database and the time the information was delivered.
app.get('/info', (request, response) => {
  const time = new Date()

  Person.find({}).then(
    persons => {
      response.send(`<div><p>Phonebook has info for ${persons.length} persons</p><p>${time}</p></div>`)
    }
  )
})

//Handles the servercall for one persons id and returns it in json format.
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then( person => {
      if (person) {
        response.json(person)
      } 
      else {
        response.status(404).end
      }
    })
    .catch(error => next(error))
})

//Handles delete requests for single entries.
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
  }
)

//Handles POST requests for new entries.
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
  .then(person => {
    response.json(person)
  })
  .catch(error => next(error))
})

//Handles change request for entries.
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  //CastError checks if the id sent is a valid mongoose ObjectID
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  
  /*
  ValidationError is the default name for MongoDB schema validation failures but is also set as the name in POST
  for name or number missing.
  */
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  //Default handling if error doesn't match errors above.
  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})