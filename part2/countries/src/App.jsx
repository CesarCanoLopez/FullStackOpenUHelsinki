import { useState, useEffect } from 'react'
import servicesCountries from "./services/countries"
import ShowCountries from './components/ShowCountries'

function App() {
  const [filter, setFilter] = useState("")
  const [countriesToShow, setCountriesToShow] = useState([])
  
   useEffect(() => {
      servicesCountries
        .getAll()
        .then(response => {
          setCountriesToShow(response)
        })
    }, [])
  
  const handleSearch = (event) => {
    const value = event.target.value
    setFilter(value)
  }
  return (
      <div>
        <div>
          find countries <input onChange={handleSearch} type="text" />
        </div>
        <div>
          <ShowCountries countries={countriesToShow} filter={filter}/>
        </div>
      </div>
  )
}

export default App
