import axios from 'axios'

const getCountries = () => {
    return axios
        .get("https://studies.cs.helsinki.fi/restcountries/api/all")
        .then(resp => resp.data)
        .catch(error => console.log(error))
}

// Using Open-Meteo Free Open Source Weather API (https://open-meteo.com/)
// Please note that this API doesn't provide any weather icons
const getWeather = (coordinates) => {
    return axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current=temperature_2m,windspeed_10m&windspeed_unit=ms&forecast_days=1`)
        .then(resp => resp)
        .catch(error => console.log(error))
}

export default { getCountries, getWeather }