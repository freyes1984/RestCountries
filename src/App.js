import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OneCountry from './components/OneCountry/OneCountry'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function App() {

  const [countries, setCountries] = useState([])
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const hooks = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
  }

  useEffect(hooks, [])

  const items = countries.map((country, i) => ({
    id: i,
    name: country.name.common,
    flag: country.name.common + ' ' + country.flag
  }))

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log('handleOnSearch', string, results)
    const effect = document.getElementById('country')
    effect.style.display = 'none'
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log('handleOnHover', result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log('handleOnSelect', item)
    const results = countries.filter(country => country.name.common === item.name)
    setstate({
      query: item.name,
      list: results
    })

    const effect = document.getElementById('country')
    effect.style.display = ''
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <div className="App" style={{ "margin": "auto", "width": "35%", "padding": "20px" }}>
      <header className="App-header">
        <div style={{ "width": "400px", "margin": "2px 1em 50px 0" }}>
          <ReactSearchAutocomplete
            items={items}
            resultStringKeyName="flag"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            styling={{ backgroundColor: "white" }}
          />
        </div>
      </header>

      <div id='country' style={{ "display": 'none' }}>
        {state.list.length === 1 ? (
          <OneCountry country={state.list}></OneCountry>
        ) : ('')}
      </div>

    </div>
  );
}

export default App;