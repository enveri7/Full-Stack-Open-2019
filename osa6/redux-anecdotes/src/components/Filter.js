import React from 'react'
import { filterAnecdotes } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        console.log(event.target.value)
        props.filterAnecdotes(event.target.value)
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

const mapDispatchToProps = {
    filterAnecdotes
}

export default connect(null, mapDispatchToProps)(Filter)