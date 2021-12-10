import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPersons, setShowPersons] = useState(persons)
  const [filterSearch, setFilterSearch] = useState('')

  //[] means run one time after rendering.
  useEffect(() => {
    personService
    .getAll()
    .then(responseData => setPersons(responseData))
  }, [])

    //Callback for hooks filterSearch, everytime filterSearch gets update run this.
    useEffect(() => {
      setShowPersons(persons.filter(person => person.name.toLowerCase().includes(filterSearch.toLowerCase())))
    },[persons,filterSearch])
  
  
    useEffect(() => {
      setShowPersons(persons)
    },[persons])


  const addPerson = (event) => {
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
        name: newName,
        number: newNumber
      }

      personService
      .create(personObject)
      .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
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

  const handleFilterSearch = (event) => {
    setFilterSearch(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
      filterSearch={filterSearch}
      handleFilterSearch={handleFilterSearch}
      />

      <h2>Add a new</h2>
      <PersonForm 
        newName= {newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={showPersons}/>
    </div>
  )
}

export default App