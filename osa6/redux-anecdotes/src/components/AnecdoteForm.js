import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotificationWithTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {

    const addAnecdote = (e) => {
        e.preventDefault()
        const content = e.target.new.value
        store.dispatch(createAnecdote(content))
        showNotificationWithTimeout(store.dispatch, `New anecdote '${content}' created.`)
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

export default AnecdoteForm