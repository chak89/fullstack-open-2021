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


  useEffect(() => {
    setShowPersons(persons)
  }, [persons])


  //Callback for hooks filterSearch, everytime filterSearch gets update run this.
  useEffect(() => {
    setShowPersons(persons.filter(person => person.name.toLowerCase().includes(filterSearch.toLowerCase())))
  }, [persons, filterSearch])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)

    //Check if person name exist
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
        const changedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }


    /*     persons.forEach(person => {
          if (person.name === newName) {
            nameExist = true
            return;
          }
        })
    
        if (nameExist) {
    
    
        } else {
          const personObject = {
            name: newName,
            number: newNumber
          }
    
          personService
            .create(personObject)
            .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        } */

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (person) => {
    console.log('deletePerson')

    if (window.confirm(`Delete ${person.name} with id ${person.id}?`)) {
      personService
        .deleteId(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          console.log('Delete successful')
        })
        .catch(err => console.log('error:', err))
    }
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
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons persons={showPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App