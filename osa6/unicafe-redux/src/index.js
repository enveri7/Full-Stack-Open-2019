import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const handleClick = (value) => {
    store.dispatch({
      type: value
    })
  }

  const good = store.getState().good
  const neutral = store.getState().ok
  const bad = store.getState().bad

  const total = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * -1) / total
  const positive = (good / (good + bad + neutral))

  return (
    <div>
      <button onClick={() => handleClick('GOOD')}>hyvä</button>
      <button onClick={() => handleClick('OK')}>neutraali</button>
      <button onClick={() => handleClick('BAD')}>huono</button>
      <button onClick={() => handleClick('ZERO')}>nollaa tilastot</button>
      <div>hyvä {good}</div>
      <div>neutraali {neutral}</div>
      <div>huono {bad}</div>
      <div>yhteensä {total}</div>
      <div>keskiarvo {average}</div>
      <div>positiivisia {positive}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
