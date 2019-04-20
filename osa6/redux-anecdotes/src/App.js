import React from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

const App = (props) => {
  console.log(props.store.getState())
  const anecdotes = props.store.getState().anecdotes
  const notifications = props.store.getState().notifications
  const store = props.store
  
  return (
    <div>
      {(notifications.length > 0) && <Notification notifications={notifications}/>}
      <h2>Anecdotes</h2>
      <AnecdoteList store={store} anecdotes={anecdotes}/>
      <h2>create new</h2>
      <AnecdoteForm store={store}/>
    </div>
  )
}

export default App
