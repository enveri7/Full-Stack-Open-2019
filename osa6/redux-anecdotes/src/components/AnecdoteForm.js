import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.new.value
        props.createAnecdote(content)

        const notificationID = Date.now()
        props.setNotification(`You voted '${content}'.`, notificationID, 5)
    }

    return (
        <div>
            <form onSubmit={addAnecdote}>
                <div>new anecdote: <input name="new" type="text" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)