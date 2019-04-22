import React, { useEffect } from 'react';
import {connect} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotesService from './services/anecdotes'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    anecdotesService.getAll()
    .then(data => {
      props.initializeAnecdotes(data)
    })
  }, []);
  
  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)
