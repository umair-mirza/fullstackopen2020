import React, {useState, useEffect} from 'react'
import axios from 'axios'
import WeatherData from './WeatherData'

const Country = ({searchField}) => {

    const [country, setCountry] = useState([])
    
    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/name/${searchField}`)
        .then(response => setCountry(response.data))
    }, [searchField])

        if(country.length >= 1) {
            return (
                <div>
                    <h2>{country[0].name}</h2>
                    <p>Capital: {country[0].capital}</p>
                    <p>Population: {country[0].population}</p>

                    <h4>Languages</h4>
                    <ul>
                    {country[0].languages.map(language => {
                        return (
                            <li key={language.name}>{language.name}</li>
                        )
                    })}
                    </ul>
                    <div><WeatherData capital={country[0].capital} /></div>
                    <div>
                        <img src={country[0].flag} alt={country[0].name} style={{height: 200, width: 200}} />
                    </div>
                </div>
            )
        }
        return null
}

export default Country