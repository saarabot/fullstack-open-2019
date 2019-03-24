import React from 'react';

const Country = ({selectedCountry, weather}) => {
    return (
        <>
            <h1>{selectedCountry.name}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Population: {selectedCountry.population}</p>
            <h2>Languages:</h2>
            <ul>
            {selectedCountry.languages.map((l) => {
                return <li key={l.name}>{l.name}</li>;
            })}
            </ul>
            <img alt="flag" style={{width: '200px', padding: '16px 16px', border: '1px solid gray', borderRadius:'20px'}}src={selectedCountry.flag}/>
            {weather.condition !== undefined && 
            <><h2>Weather in {selectedCountry.capital}</h2>
            <p><b>Temperature: </b>{weather.temp_c} C</p>
            <p><b>Wind: </b>{weather.wind_kph} kph, direction {weather.wind_dir}</p>
            <img alt="weather" src={weather.condition.icon} /></>}
        </>
    )
}

export default Country;
