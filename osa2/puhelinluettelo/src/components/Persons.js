import React from 'react'
import personService from '../services/Persons'

const Person = ({ id, name, number, setPersons, setMessage }) => {
    const removePerson = (id, name) => {

        if (window.confirm(`Haluatko varmasti poistaa kohteen ${name}`)) {
            personService.remove(id).then(() => {

                setMessage(
                    { message: `${name} poistettu.`, style: "success" }
                )
                setTimeout(() => {
                    setMessage({ message: null })
                }, 2000)

                personService.getAll()
                    .then(data => {
                        setPersons(data)
                    })
            })
        }
    }

    return (
        <p>{name} {number} <button onClick={() => { removePerson(id, name) }}>poista</button></p>
    )
}

const Persons = ({ persons, setMessage, Filtered, setPersons }) => {

    const filtered = persons.filter(person => {
        return person.name.toUpperCase().includes(Filtered.toUpperCase())
    })

    return (
        <>
            {filtered.map(person =>
                <Person
                    key={person.name}
                    name={person.name}
                    number={person.number}
                    id={person.id}
                    setPersons={setPersons}
                    setMessage={setMessage}
                />)}
        </>
    )
}

export default Persons
