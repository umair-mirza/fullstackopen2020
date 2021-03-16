import React from 'react'

const DispCountry = ({selectedCountry}) => {

            return (
                <div>
                    <h2>{selectedCountry.name}</h2>
                    <p>Capital: {selectedCountry.capital}</p>
                    <p>Population: {selectedCountry.population}</p>

                    <h4>Languages</h4>
                    <ul>
                    {selectedCountry.languages.map(language => {
                        return (
                            <li key={language.name}>{language.name}</li>
                        )
                    })}
                    </ul>
                    <div>
                        <img src={selectedCountry.flag} alt={selectedCountry.name} style={{height: 200, width: 200}} />
                    </div>
                </div>
            )
        }

export default DispCountry