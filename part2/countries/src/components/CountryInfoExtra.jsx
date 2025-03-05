import { useState, useEffect } from "react";
import servicesCountries from "../services/countries"

const CountryInfoExtra = ({country}) => {
  const [weather, setWeather] = useState(null);
  
  useEffect (() => {
    servicesCountries
      .getWeather(country.capital)
      .then(response => {
        setWeather(response)
      })
  },[country.capital])

  if (weather) {
    return(
      <>
      <h1>{country.name.common}</h1>
          <div>{country.capital}</div>
          <div>Area {country.area}</div>
          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} />
          <h2>Weather in {country.capital}</h2>
          <div>Temperate {weather.main.temp} Celsius</div>
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <div>Wind {weather.wind.speed} m/s</div>
      </>
    )
  }  
}

export default CountryInfoExtra