import React from 'react'

const AddPerson = ({ persons, setPersons, newName, newNumber, setNewName, setNewNumber, handleNameChange, handleNumberChange }) => {

    const addContact = (event) => {
        event.preventDefault()
        const alreadyExists = persons.find(p => p.name === newName);
        if (alreadyExists !== undefined) {
            alert(`${newName} on jo luettelossa`)
        } else {
            const contactObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(contactObject))
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
