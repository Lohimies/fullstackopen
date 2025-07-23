import { useState, useEffect } from 'react'
import axios from 'axios'
import PhonebookWithFilter from './components/PhonebookWithFilter'
import AddPerson from './components/AddPerson'
import dbHandling from './services/dbHandling'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [namesFilter, setFilter] = useState('')

  useEffect(() => {
    dbHandling
      .getAll()
      .then(initialPersonsArray => setPersons(initialPersonsArray))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personArray = Array.from(persons, (person) => person.name)
    
    if (personArray.includes(newName)) {
      alert(`${newName} is already added to phonebook`) 
    }
    else {
      dbHandling
      .create({name: newName, number: newNumber})
      .then(addedPerson => setPersons(persons.concat(addedPerson)))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <AddPerson addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}></AddPerson>
      <PhonebookWithFilter namesFilter={namesFilter} persons={persons} handleFilterChange={handleFilterChange}></PhonebookWithFilter>
    </div>
  )

}

export default App