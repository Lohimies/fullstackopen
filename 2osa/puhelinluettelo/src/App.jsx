import { useState, useEffect } from 'react'
import PhonebookFilter from './components/PhonebookFilter'
import AddPerson from './components/AddPerson'
import dbHandling from './services/dbHandling'
import PhonebookPeople from './components/PhonebookPeople'
import Notification from './components/Notification/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [namesFilter, setFilter] = useState('')
  const [displayMessage, setDisplayMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  

  useEffect(() => {
    dbHandling
      .getAll()
      .then(initialPersonsArray => setPersons(initialPersonsArray))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personArray = Array.from(persons, (person) => person.name)
    
    if (personArray.includes(newName)) {
      if (window.confirm(`${newName} already exist in the phonebook. Do you want to change the number on this entry?`)) {
        const person = persons.find((n) => n.name === newName)
        const changedPerson = {...person, number: newNumber}
        dbHandling.update(person.id, changedPerson)
          .then(changedData => {
            console.log('number changed successfully:', changedData)
            setPersons(persons.map((person) => person.id === changedData.id ? changedData : person))
            })
          .catch(error => {
            setErrorMessage(`${error} happened while trying to change the number of the entry named ${newName}.`)
            setTimeout(() => {
              setErrorMessage(null)
              }, 5000)
            })
      }
    }
    else {
      dbHandling
        .create({name: newName, number: newNumber})
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setDisplayMessage(`${addedPerson.name} successfully added to phonebook`)
          setTimeout(() => {
            setDisplayMessage(null)
            }, 5000)})
        .catch(error => {
              setErrorMessage(`${error} happened while trying to add the person ${newName} to phonebook.`)
              setTimeout(() => {
                setErrorMessage(null)
                }, 5000)
              })
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
      <Notification type={"confirm"} message={displayMessage}/>
      <Notification type={"error"} message={errorMessage}/>
      <PhonebookFilter namesFilter={namesFilter} handleFilterChange={handleFilterChange}></PhonebookFilter>
      <PhonebookPeople namesFilter={namesFilter} persons={persons} setPersons={setPersons}></PhonebookPeople>
    </div>
  )

}

export default App