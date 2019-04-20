import React from 'react';
import {increaseVotes} from '../reducers/anecdoteReducer'
import {showNotificationWithTimeout} from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, store }) => {
    const vote = (anecdote) => {
        const {id, content} = anecdote
        store.dispatch(increaseVotes(id))
        showNotificationWithTimeout(store.dispatch, `You voted '${content}'.`)
      }

    return (
        <div>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
