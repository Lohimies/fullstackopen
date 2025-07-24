import dbHandling from "../services/dbHandling"


const PhonebookPeople = ({namesFilter, persons, setPersons}) => {

  const confirmDelete = (name, idOfDelete) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      deletePerson(idOfDelete)
    }
  }

  const deletePerson = (idOfDelete) => {
    const newPersonsArray = persons.filter((person) => person.id !== idOfDelete)
    dbHandling.deletePersonFromDB(idOfDelete)
      .then(response => {
        console.log('User deleted successfully', response)
        setPersons(newPersonsArray)
        }
      ) 
      .catch(error => console.error('Error deleting user', error))
  }

  const personListToUse = () => {
    if (namesFilter.length === 0) {
      return (
        persons
      )
    }
    else {
      return (
        persons.filter((person) =>  person.name.toLowerCase().includes(namesFilter.toLowerCase()))
      )
    }
  }
  
  
  return (
      <ul>
        {personListToUse().map(person => 
          <li key={person.id}>
            {person.name} -- {person.number} -- <button onClick={() => confirmDelete(person.name, person.id)}>delete person</button>
          </li>
        )}
      </ul>
    ) 
}

export default PhonebookPeople