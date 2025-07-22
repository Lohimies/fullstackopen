import React from 'react'

const AddPerson = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <h2>Add person:</h2>
        <div>
          name: <input name='addNameInput' value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input name='addNumberInput' value={newNumber} onChange={handleNumberChange}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default AddPerson