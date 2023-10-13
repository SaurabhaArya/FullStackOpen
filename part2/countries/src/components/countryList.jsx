import { useState } from "react"
import Country from "./country"

const CountryList = ({countries}) => {
    const [showInfo, setShowInfo] = useState({})

    const handleShowInfo = (country) => {
        setShowInfo({
            [country]: true
        })
    }

    return (
        <>
            {countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => handleShowInfo(country.name.common)}>Show</button>
                    {showInfo[country.name.common] && <Country country={country} />}
                </div>
            ))}
        </>
    )
}

export default CountryList