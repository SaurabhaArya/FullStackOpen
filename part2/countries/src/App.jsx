import { useEffect, useState } from 'react'
import service from './services/countries'
import CountryList from './components/countryList'
import Country from './components/country'

const App = () => {
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [contentToRender, setContentToRender] = useState(null)

    const hook = () => {
      service
        .getCountries()
        .then(resp => {
          console.log(resp)
          setIsLoading(false)
          setCountries(resp)
        })
    }
    useEffect(hook, [])
    
    const handleSearch = (event) => {
      const input = event.target.value
      const filteredList = countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()))
      setSearch(input)

      if (filteredList.length > 10) {
        setContentToRender(<p>Too many matches, specify another filter</p>)
      } else if (filteredList.length > 1 && filteredList.length <= 10 ) {
        setContentToRender(<CountryList countries={filteredList} />)
      } else if (filteredList.length === 1) {
        setContentToRender(<Country country={filteredList[0]} />)
      } else {
        setContentToRender(null)
      }
    }

    return (
      <>
        {isLoading ? (
          <div>Loading please wait...</div>
        ) : (
          <div>
            Find countries
            <input 
              type="search"
              value={search}
              onChange={handleSearch}
            />
            {contentToRender}
          </div>
        )}
      </>
    )

}
export default App