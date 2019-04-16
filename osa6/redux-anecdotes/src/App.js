import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';


const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} anecdotes={anecdotes}/>
      <h2>create new</h2>
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
