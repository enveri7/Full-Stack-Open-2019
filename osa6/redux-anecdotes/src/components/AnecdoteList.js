import React from 'react';
import { increaseVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        const { content } = anecdote
        props.increaseVotes(anecdote)

        const notificationID = Date.now()
        props.setNotification(`You voted '${content}'.`, notificationID, 5)
    }

    const filtered = props.anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(props.filter.toUpperCase()))

    return (
        <div>
            {filtered.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes} votes <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    increaseVotes,
    setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes