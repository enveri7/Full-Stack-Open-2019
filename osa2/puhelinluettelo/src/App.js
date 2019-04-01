import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import personService from './services/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filtered, setFiltered] = useState('')

  const hook = () => {
    personService.getAll()
      .then(data => {
        setPersons(data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFiltered(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter handleFilterChange={handleFilterChange} Filtered={Filtered} />
      <h2>Lisää uusi</h2>
      <AddPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} setNewNumber={setNewNumber} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numerot</h2>
      <Persons persons={persons} setPersons={setPersons} Filtered={Filtered} />
    </div>
  )
}

export default App
