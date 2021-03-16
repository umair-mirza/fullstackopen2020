import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Country from './Country'
import DispCountry from './DispCountry'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchField, setSearchField] = useState('')
  const [isClicked, setClicked] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  }, [])

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchField.toLowerCase()))
  
  const buttonHandler = (cn) => {
    setClicked(!isClicked)
    setSelectedCountry(cn)
  }

  return (
    <div>
      <h1>Find Countries</h1>
      <div>
        find countries: <input value={searchField} onChange={(e) => setSearchField(e.target.value)} />

        <h3>List of Searched Countries</h3>
        {
          filteredCountries.length === 1 ? (<Country searchField={searchField} />) :
          (searchField.length > 0 && filteredCountries.length > 10 ? 
            (<div>Too many matches, specify another filter</div>) : 
            (filteredCountries.map(country => {
            return (
              <div key={country.numericCode}>
              <div>
                <span>{country.name}  <button onClick={() => buttonHandler(country.name)}>show</button></span>
              </div>
            {isClicked && country.name === selectedCountry ? <DispCountry selectedCountry={country} /> : null}
              </div>
            )
          })))
        }
      </div>
    </div>
  );
}

export default App;
