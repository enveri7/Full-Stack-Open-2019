import React from 'react'
import personService from '../services/Persons'

const AddPerson = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addContact = (event) => {
        event.preventDefault()

        const contactObject = {
            name: newName,
            number: newNumber
        }

        const alreadyExists = persons.find(p => p.name === newName);

        if (alreadyExists !== undefined) {
            const id = alreadyExists.id
            if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                personService.update(id, contactObject).then(returnedPerson => setPersons(persons.map(person => person.id !== id ? person : returnedPerson)))
            }
        } else {
            personService.create(contactObject).then(data => setPersons(persons.concat(data)))
        }

        setNewName('')
        setNewNumber('')
    }

    return (
        <form onSubmit={addContact}>
            <div>
                nimi: <input onChange={handleNameChange} value={newName} />
            </div>
            <div>
                numero: <input onChange={handleNumberChange} value={newNumber} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default AddPerson
