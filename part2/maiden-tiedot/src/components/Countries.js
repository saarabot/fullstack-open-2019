import React from 'react';

const Countries = ({ setSelectedCountry, selectedCountry, countries,showCountry}) => {
    if(countries.length === 0) {
        return <></>
    }
    if(selectedCountry.name === undefined) {
        if(countries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if(countries.length > 1){
            return (countries.map((c) => {
                return (
                    <div key={c.alpha2Code}>
                        <p >{c.name}</p>
                        <button onClick={() => showCountry(c)}>show</button>
                    </div>
                );
            }))
        } else if(countries.length === 1){
            setSelectedCountry(countries[0]);
            showCountry(countries[0]);
        }
    } else {
        return <></>
    }
    
}

export default Countries;