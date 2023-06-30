import React, {useState, useEffect} from 'react'
import axios from 'axios'
import AlertFilter from './components/AlertFilter/AlertFilter'
import ItemCountries from './components/ItemCountries/ItemCountries'
import OneCountry from './components/OneCountry/OneCountry'
//import InputAuto from './components/InputAuto/InputAuto'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function App() {

  const [countries, setCountries] = useState([])
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const hooks = () => {
    console.log('Initial hook')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log('success', response.data)
        setCountries(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
  }

  useEffect(hooks, [])

  const handleClick = (countryShow) => {
    const results = countries.filter(country => country.name.common === countryShow)
    setstate({
      query: countryShow,
      list: results
    })
  }

  const handleChange = (e) => {   
    const results = countries.filter(country => {
      if (e.target.value === '') return countries
      return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      })
      setstate({
        query: e.target.value,
        list: results
      })
  }

  //console.log('Filter Countries', state.list[0].name)
  //console.log('Count Input', state.query.length)
  //console.log('Count Countries', state.list.length)

  const items = countries.map((country, i) => ({ 
                                                  id:i, 
                                                  name:country.name.common, 
                                                  flag:country.name.common+' '+country.flag
                                                }))

  console.log('Items', items)

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log('handleOnSearch', string, results)
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
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <><div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            resultStringKeyName="flag"
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus 
          />
        </div>
      </header>
    </div><><>
    </>
        <div className="RestCountries">
          <label>Find Countries</label>
          <input type='text' className='' id='findCountry' placeholder='Find Countries' value={state.query} onChange={handleChange}></input>
          <div className="FilterCountries">
            <AlertFilter allRows={state.list} allInput={state.query} />
            {state.list.length <= 10 ? (
              <div className="ListCountries">
                <ul>
                  {state.list.map((country, i) => (
                    <ItemCountries
                      key={i}
                      labelCountry={country.name.common}
                      showOnlyCountry={() => handleClick(country.name.common)}>
                    </ItemCountries>
                  ))}
                </ul>
              </div>
            ) : ('')}

            {state.list.length === 1 ? (
              <OneCountry country={state.list}></OneCountry>
            ) : ('')}
          </div>
        </div></></>
  );
}

export default App;