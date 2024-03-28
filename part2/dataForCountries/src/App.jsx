import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import weather from './services/weather'

const SearchCountries = ({searchName, eventHandler}) => <div>fidn countries <input value = {searchName} onChange={eventHandler}/></div>

const Countries = ({name, showCountry}) => {
  return(
    <div> 
      {name}
      <button onClick={showCountry}>show</button>
    </div>
  )
}

const Country = ({name, capital, area, languages, countryFlag, temperature}) => {
  const languagesValues = Object.values(languages)
  // console.log("Temp",temperature.main.temp)
  const weatherIcon = `https://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`
  const temperatureReading = ((temperature.main.temp -32) * (5/9)).toFixed(2)
  return(
    <div> 
      <h1>{name}</h1> 
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h3>Languages:</h3>
      {languagesValues.map((language, index)=> (<li key = {index}>{language}</li>))}
      <img src={countryFlag.png}></img>
      <h1>Weather in {capital}</h1>
      <p>temperature {temperatureReading} celcuis</p>
      <img src={weatherIcon}></img>
      <p>wind {temperature.wind.speed} m/s</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchName, setSearchName] = useState('');
  const [weather, setWeather] = useState([])

  useEffect(() => {
    console.log('effect')
    countriesService
      .getAll()
      .then(response => {
        setCountries(response.data)
    })
  }, [])
  console.log('render', countries.length, 'countires')

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchName.toLowerCase())
  );

  useEffect(() => {
    console.log("here", searchName)
    let count = 0
    if(searchName){
      if (filteredCountries.length === 1){
        console.log("countb", count)
        if (count === 0){
          console.log("count", count)
          const country = filteredCountries[0]
          weatherService
            .getAll(country.capitalInfo.latlng[0],country.capitalInfo.latlng[1])
            .then(response => {
              setWeather(response.data)
            })
          console.log("render", weather, "weather")
          count++;
        }
      }
      else{
        count = 0
      }
    }

  }, [searchName, filteredCountries])


  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const showCountry = ({country}) =>{
    setSearchName(country.name.common)
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
              temperature = {weather}
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
              showCountry ={()=>showCountry({country})}
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