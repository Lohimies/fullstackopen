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

app.get('/info', (request, response) => {
  const time = new Date()

  Person.find({}).then(
    persons => {
      response.send(`<div><p>Phonebook has info for ${persons.length} persons</p><p>${time}</p></div>`)
    }
  )
})

//Not finished. Returns an empty list if no matching id is not found. With mongoDB id is an object so this will be likely.
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.find({id: id}).then(person => 
    response.json(person)
  )
  .catch(error => response.status(404).end())
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  personData = personData.filter(person => person.id !== id)

  response.status(204).end()
})

/*
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'Name is missing.' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'Number is missing.' 
    })
  }

  if(personData.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'Name must be unique.' 
    })
  }

  const person = {
    id: `${Math.floor(Math.random() * 100000)}`,
    name: body.name,
    number: body.number
  }

  personData = personData.concat(person)

  response.json(person)
})
  */

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