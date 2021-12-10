import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Countries from './components/Countries';
import Search from './components/Search';

function App() {
  
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [showResult, setShowResult] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    setShowResult(countries.filter(country => country.name.common.toLowerCase().includes(search.toLocaleLowerCase())))
  }, [search,countries])

  useEffect(() => {
    setShowResult(countries)
  },[countries])
 
  return (
    <>
      <Search search={search} handleSearch={handleSearch}
      />

      <Countries showResult={showResult}/>
    </>
  )
}

export default App;
