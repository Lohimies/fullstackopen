
const PhonebookWithFilter = ({filter, persons, handleFilterChange}) => {

    return (
      <div>
          <h2>Numbers</h2>
          <div>
            filter:
            <input name="filterInput" value={filter} onChange={handleFilterChange}>
            </input>
          </div>
          <FilterNames filter={filter} persons={persons}></FilterNames>
        </div>
    )
}

const FilterNames = ({filter, persons}) => {
  const filteredNames = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
  
  if (filter.length === 0) {
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