import React, {useState, useEffect} from 'react'
import axios from 'axios'

const WeatherData = ({capital}) => {

    const [weather, setWeather] = useState('')

    const API_KEY = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
        .then(response => setWeather(response.data))
        .catch(error => console.log('could not fetch data'))
    },[])

    if(!weather) {
        return <div></div>
    }

    return (
        <div>
            <h3>{capital}'s weather</h3>
            Capital's Weather: {weather.current.temperature} degrees
        </div>
    )
}

export default WeatherData