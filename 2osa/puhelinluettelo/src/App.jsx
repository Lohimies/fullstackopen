import { useState } from 'react'

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

  const NamesByFilter = ({filter, persons}) => {
    if (filter.length === 0) {
      return (
        <ul>
        {persons.map(person => <p key={person.name}>{person.name} -- {person.number}</p>)}
      </ul>
      )
    }
    else {
      const filteredNames = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
      return (
        <ul>
          {filteredNames.map(person => <p key={person.name}>{person.name} -- {person.number}</p>)}
        </ul>
      )
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <form onSubmit={addPerson}>
        <div>
          filter:
          <input value={filter} onChange={handleFilterChange}>
          </input>
        </div>
        <h2>Add person:</h2>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <NamesByFilter filter={filter} persons={persons}></NamesByFilter>
    </div>
  )

}

export default App