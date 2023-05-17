import axios from 'axios'



const WeatherInstance = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather?`
})

export default WeatherInstance