import { useEffect, useState } from 'react'
import dbTools from './Services/dbTools'
import ShowCountries from './Components/ShowCountries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    dbTools.getAll()
      .then(data => setCountries(data))
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleButtonClick = (name) => {
    setSearch(name)
  }

  return (
      <div>
       <input key={"countrySearchbar"} onChange={handleSearchChange}></input>
       <ShowCountries searchFilter={search} countries={countries} handleButtonClick={handleButtonClick}></ShowCountries>
      </div>
  )
}

export default App
