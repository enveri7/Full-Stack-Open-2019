import React from 'react'

const Filter = ({ Filtered, handleFilterChange }) => {

    return (
        <>
            rajaa näytettäviä <input onChange={handleFilterChange} value={Filtered} />
        </>
    )
}

export default Filter
