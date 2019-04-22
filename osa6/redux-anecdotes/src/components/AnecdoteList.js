import React from 'react';
import { increaseVotes } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        const { id, content } = anecdote
        props.increaseVotes(id)

        const notificationID = Date.now()
        props.showNotification(`You voted '${content}'.`, notificationID)
        setTimeout(() => {
            props.removeNotification(notificationID)
        }, 5000)
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
    showNotification,
    removeNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes