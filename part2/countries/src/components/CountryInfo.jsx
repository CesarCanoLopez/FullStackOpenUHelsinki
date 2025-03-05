import CountryInfoExtra from "./CountryInfoExtra"
import { useState } from "react";


const CountryInfo = ({country}) => {
    const [btnState, setBtnState] = useState(true)
  
    const handleClick = () => {
      setBtnState(!btnState)
    }
    return (
      btnState ? 
      (
        <div>
          {country.name.common}
          <button onClick={handleClick}>Show</button>
        </div>
      ) :
      (
        <div>
          {country.name.common}
          <button onClick={handleClick}>Hide</button>
          <CountryInfoExtra country={country} />
        </div>
      )
    )
  }

export default CountryInfo