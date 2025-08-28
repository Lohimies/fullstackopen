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
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then( person => {
      if (person) {
        response.json(person)
      } 
      else {
        response.status(404).end
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({error: 'malformatted id'})
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => response.status(204).end())
    .catch(error => next(error))
  }
)

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(person => {
    response.json(person)
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})