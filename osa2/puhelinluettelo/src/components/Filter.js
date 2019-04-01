import React from 'react'

const Filter = ({Filtered, setFiltered}) => {

    const handleFilterChange = (event) => {
        setFiltered(event.target.value)
    }

    return (
        <>
        rajaa näytettäviä <input onChange={handleFilterChange} value={Filtered} />
    </>
    )
}

export default Filter
