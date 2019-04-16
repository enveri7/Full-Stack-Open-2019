import React from 'react';
import {increaseVotes} from '../reducers/anecdoteReducer'

const AnecdoteList = ({ anecdotes, store }) => {
    const vote = (id) => {
        store.dispatch(increaseVotes(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
