
const PhonebookWithFilter = ({namesFilter, persons, handleFilterChange}) => {

    return (
      <div>
          <h2>Numbers</h2>
          <div>
            filter:
            <input name="filterInput" value={namesFilter} onChange={handleFilterChange}>
            </input>
          </div>
          <FilterNames namesFilter={namesFilter} persons={persons}></FilterNames>
        </div>
    )
}

const FilterNames = ({namesFilter, persons}) => {
  const filteredNames = persons.filter((person) =>  
    person.name.toLowerCase().includes(namesFilter.toLowerCase()))

  if (namesFilter.length === 0) {
    return (
      <ul>
        {persons.map(person => <p key={person.name}>{person.name} -- {person.number}</p>)}
      </ul>
    )
  }
  else {
    return (
      <ul>
        {filteredNames.map(person => <p key={person.name}>{person.name} -- {person.number}</p>)}
      </ul>
    )
  } 
}

export default PhonebookWithFilter