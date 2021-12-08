import React, { useState } from 'react'


const DisplayNames = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    let nameExist = false

    persons.forEach(person => {
      if (person.name === newName) {
        nameExist = true
        return;
      }
    })

    if (nameExist) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))
    }

    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log('event', event.target.value)
    setNewName(event.target.value)
  }

  const displayNames = persons.map((person, index) => <DisplayNames key={index} person={person} />);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {displayNames}
      </div>
      <div>debug: {newName}</div>
    </div>

  )
}

export default App