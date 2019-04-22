import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = (props) => {

    const addAnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.new.value
        const newAnecdote = await anecdotesService.create({ content, votes: 0 })
        props.createAnecdote(newAnecdote)

        const notificationID = Date.now()
        props.showNotification(`You voted '${content}'.`, notificationID)
        setTimeout(() => {
            props.removeNotification(notificationID)
        }, 5000)
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
    showNotification,
    removeNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)