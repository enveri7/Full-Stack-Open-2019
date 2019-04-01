import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Results = ({countries}) => {
  const imageStyle = {width: '200px', heigth: '120px'}
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length < 10 && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <p key={country["alpha3Code"]}>{country.name}</p>)}
      </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Languages</h2>
        {country.languages.map(lang => <p key={lang["iso639_2"]}>{lang.name}</p>)}
        <img style={imageStyle} src={country.flag}></img>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [Filtered, setFiltered] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFiltered(event.target.value)
  }

  const filtered = countries.filter(country => {
    return country.name.toUpperCase().includes(Filtered.toUpperCase())
  })

  return (
    <div>
      find countries <input onChange={handleFilterChange} value={Filtered} />
      <Results countries={filtered} />
    </div>
  )
}

export default App
