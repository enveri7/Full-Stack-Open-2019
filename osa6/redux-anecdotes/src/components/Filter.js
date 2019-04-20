import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
    const store = props.store
    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        console.log(event.target.value)
        store.dispatch(filterAnecdotes(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter