import { useState } from 'react'
import PhonebookWithFilter from './components/PhonebookWithFilter'
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personArray = Array.from(persons, (person) => person.name)
    personArray.includes(newName) ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat({name: newName, number: newNumber}))
    setNewName('')
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
      <PhonebookWithFilter filter={filter} persons={persons} handleFilterChange={handleFilterChange}></PhonebookWithFilter>
    </div>
  )

}

export default App