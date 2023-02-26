import { useState, useEffect } from "react"
import '../styles/DetailWeather.css'
import {getWeatherData} from './WeatherApi'
import iconWateDrop from '../assets/iconWate.svg'
import iconAir from '../assets/iconAir.svg'
import iconWeather from '../assets/iconWeather.svg'
import iconSun from '../assets/iconSun.svg'



export function WeatherDetails (props) {
          const [weatherdata, setWeatherData] = useState(null)
          const [loading, setLoading] = useState(false)
               
          
          const getData = async (city) => {
               try{
                     const data = await getWeatherData(city ? city : "Belo horizonte")
                     setWeatherData(data)
                     setLoading(false)
                     
                   }catch(error) {
                   setLoading(false)
                 }
               }
               
          useEffect(() => {
               getData(props.city)
               
          }, [props.city])
          
          
          const sunriseTime = weatherdata?.sys?.sunrise * 1000
          const sunsetTime = weatherdata?.sys?.sunset * 1000

          const sunrise = new Date(sunriseTime)
          const sunset = new Date(sunsetTime)
                    
          
          const horasMinutos = (date) => {
               const hours = date.getHours().toString().padStart(2, "0")
               const minutes = date.getMinutes().toString().padStart(2, "0")
               return `${hours}:${minutes}`
             };
           

          const diaOuNoite = weatherdata?.weather[0].icon?.includes("d")




return(
<>
   {weatherdata !== null ? (<> 
     <h1> Detalhes do clima hoje </h1>
     <div className='container-espefications-weather'>
         <div className="espefications-weather">
              <p> <img src={iconWateDrop} alt='iconWateDrop'></img> Umidade </p> 
              <span>{weatherdata.main.humidity}%</span>
         </div>
 
         <div className="espefications-weather">
              <p><img src={iconAir} alt='iconAir'></img>Vento</p> 
              <span>{weatherdata.wind.speed}km/h</span>
         </div>
 
         <div className="espefications-weather">
              <p> <img src={iconWeather} alt='iconWeather'></img> Sensação térmica</p> 
              <span>{(weatherdata.main.feels_like).toFixed()}&deg;</span>
         </div>
         <div className="espefications-weather">
              <p> <img src={iconSun} alt='iconSun'></img>  {diaOuNoite ? "Por do sol" : "Nascer do sol"}</p> 
              <span>{diaOuNoite ? horasMinutos(sunset) : horasMinutos(sunrise)}</span>
         </div>
 
     </div>
     </>) : null}
 </>
)
}