import CountryInfo from "./CountryInfo"
import CountryInfoExtra from "./CountryInfoExtra"

const ShowCountries = ({countries, filter}) => {
    const countriesFiltered = countries.filter(country => {
      return (country.name.common.toLowerCase().includes(filter.toLowerCase()))
    })
    if ((countriesFiltered.length === 1)) {
      return(
      <div>
        <CountryInfoExtra country={countriesFiltered[0]} />
      </div>)
    }
    if (countriesFiltered.length > 10 && !(countriesFiltered.length === 1)) {
      return(<div>Too many matches, specify another filter</div>)
    }
    return(countriesFiltered.map(country => {
      return(
            <CountryInfo key={country.ccn3}  country={country} />
      )
    }
    ))
  }

export default ShowCountries