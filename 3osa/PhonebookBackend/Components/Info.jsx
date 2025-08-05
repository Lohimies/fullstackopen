import React from 'react'

const Info = ({personData}) => {
  const numberOfPersons = personData.length
  const time = new Date()

  return (
    <div>
      <p>Phonebook has info for {numberOfPersons}</p>
      <p>{time.getDate}</p>
    </div>
  )
}

export default Info