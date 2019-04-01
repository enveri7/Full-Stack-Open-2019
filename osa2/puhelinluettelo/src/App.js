import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [Filtered, setFiltered] = useState('')

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter setFiltered={setFiltered} Filtered={Filtered} />
      <h2>Lisää uusi</h2>
      <AddPerson persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numerot</h2>
      <Persons persons={persons} Filtered={Filtered} />
    </div>
  )
}

export default App
