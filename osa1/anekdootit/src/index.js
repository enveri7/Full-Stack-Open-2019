import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf, 0))

    const handleClick = () => {
        let newValue = null
        do { // we use do-while here because we dont want to roll the same number twice in a row
            newValue = Math.floor(Math.random() * anecdotes.length)
        } while (newValue === selected)
        setSelected(newValue)
    }

    const handleVote = () => {
        const copyVotes = [...votes]
        copyVotes[selected] += 1
        setVotes(copyVotes)
    }

    const maxNum = Math.max(...votes)
    const index = votes.indexOf(maxNum)
    console.log(index, selected[index])

    return (
        <div>
            {props.anecdotes[selected]}
            <br />
            <p>Has {votes[selected]} votes</p>
            <button onClick={handleVote}>
                Vote
            </button>
            <button onClick={handleClick}>
                next anecdote
            </button>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[index]}</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)