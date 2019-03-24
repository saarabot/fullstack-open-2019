import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';
import Country from './components/Country';


const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ selectedCountry, setSelectedCountry ] = useState({});
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(response => {
      setCountries(response.data);
    })
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showCountry = (country) => {
    setSelectedCountry(country);
    axios.get(`http://api.apixu.com/v1/current.json?key=b474be5f1ba34870913114708192403&q=${country.capital}`).then((response) => {
      setWeather(response.data.current);
    })
    
  }

  const clearSearch = () => {
    setSelectedCountry({});
    setFilter('');
  }

  const displayCountries = () => {
    return countries.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()) );
    
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} clearSearch={clearSearch} />
      <Countries selectedCountry={selectedCountry} countries={displayCountries()} showCountry={showCountry} />
      {selectedCountry.name !== undefined && <Country selectedCountry={selectedCountry} weather={weather}/>}
    </div>
  );
}

export default App;
