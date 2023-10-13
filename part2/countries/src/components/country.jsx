import { useState, useEffect } from "react"
import service from '../services/countries'


const Country = ({country}) => {
    const [weather, setWeather] = useState(null)

    const hook = () => {
        service
            .getWeather(country.capitalInfo.latlng)
            .then(resp => {
                setWeather(resp.data.current)
            })
    }
    useEffect(hook, [country])

    if (!weather) {
        return null
    }

    return (
        <>
            <h2>{country.name.common}</h2>
            <div>
                Capital: {country.capital.map(coun => coun + ", ")}
            </div>
            <div>Area: {country.area}</div>
            <strong>Languages: </strong>
            <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
            </ul>
            <img 
                src={country.flags.png} 
                alt={country.flags.alt} 
                width="100"
                height="100"
            />
            <h3><p>Weather in {country.capital[0]}</p></h3>
            <p>Temprature {weather.temperature_2m} Celcius</p>
            <p>Wind {weather.windspeed_10m} m/s</p>
        </>
    )
}

export default Country