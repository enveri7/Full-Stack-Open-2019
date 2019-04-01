import React from 'react'

const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons, Filtered }) => {

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
                />)}
        </>
    )
}

export default Persons
