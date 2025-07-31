import React from 'react'
import CountryDisplay from './CountryDisplay'

const ShowCountries = ({searchFilter, countries, handleButtonClick}) => {
  const filteredCountries = countries.filter((country) => (country.name.common).toLowerCase().includes(searchFilter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter.</p>
    )
  }
  else if (filteredCountries.length > 1) {
    return (
      <div>
        <h3>Countries found:</h3>
        <ul>
          {filteredCountries.map((country) => 
            <li key={country.name.common}>{country.name.common} <button onClick={() => handleButtonClick(country.name.common)}>Show</button></li>
          )}
        </ul>
      </div>
    )
  }
  else if (filteredCountries.length === 1) {
    return (
      <div>
        {filteredCountries.map(country =>
          <CountryDisplay key={country.name.common} country={country}></CountryDisplay>)}
      </div>
    )
  }
  else {
    return (
      <div>
        No countries found. Try another filter.
      </div>
    )
  }
  
}

export default ShowCountries