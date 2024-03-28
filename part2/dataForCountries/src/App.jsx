import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const SearchCountries = ({searchName, eventHandler}) => <div>fidn countries <input value = {searchName} onChange={eventHandler}/></div>

const Countries = ({name, showCountry}) => {
  return(
    <div> 
      {name}
      <button onClick={showCountry}>show</button>
    </div>
  )
}

const Country = ({name, capital, area, languages, countryFlag}) => {
  const languagesValues = Object.values(languages)
  return(
    <div> 
      <h1>{name}</h1> 
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>Languages:</h3>
      {languagesValues.map((language, index)=> (<li key = {index}>{language}</li>))}
      <img src={countryFlag.png}></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState()

  useEffect(() => {
    console.log('effect')
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
    })
  }, [])
  console.log('render', countries.length, 'countires')

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  const showCountry = countryName =>{
      console.log("the country", {countryName})
      setSearchName(countryName)
  }
  return (
    <div>
      <SearchCountries searchName = {searchName} eventHandler = {handleSearchNameChange} /> 
      {filteredCountries.length === 1 ?
        (<div>
          {filteredCountries.map((country, index) => (
          <div key={index}>
            <Country 
              name={country.name.common}
              capital={country.capital}
              area={country.area}
              languages = {country.languages}
              countryFlag = {country.flags}
            />
            </div>
          ))}
        </div>):
        filteredCountries.length > 1 && filteredCountries.length <= 10 ?
        (<div>
          {filteredCountries.map((country, index) => (
          <div key={index}>
            <Countries 
              name={country.name.common} 
              showCountry ={()=>showCountry(country.name.common)}
            />
            </div>
          ))}
        </div>):  
          filteredCountries.length > 10 && searchName ?
          (
            <p>Too many matches, specify another filter</p>
          ): null
      }
    </div>
  
    
  )
}

export default App;