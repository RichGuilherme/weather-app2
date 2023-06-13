import { useState,  useContext} from "react"
import {DataWeather}  from '../../context/DataWeatherContent';

import './MainWeather.css'
import { DateCurrent } from "../../utils/DateCurrent";



export default function MainWeather() {

  const {weatherDatas} = useContext(DataWeather)
  const weatherdata = weatherDatas?.data


  const [relogio, setRelorio] = useState(() => {

    setInterval(() => {
      let date = new Date()
      let hr = date.getHours()
      let min = date.getMinutes()
      const offset = date.getTimezoneOffset() / 60;
      const horaUtc = date.getUTCHours() + offset;

      hr = hr < 10 ? `0${hr}` : hr
      min = min < 10 ? `0${min}` : min

      let horas = `${hr}:${min} `
    

      setRelorio(horas)
    }, 1000)

  })
  
 
  return (
    <>
        {weatherdata !== undefined ? (
        <div>
         <p className="temperatura"><span>{(weatherdata.list[0].main.temp).toFixed()}</span>&deg;</p>

         <div className="container-main-weather">
            <div className='location-and-date'>
              <span>{weatherdata.city.name}-{weatherdata.city.country}</span>
              <span>{relogio}-<DateCurrent/></span> 
            </div>
            
            <div className='weather-daily'>
               <p>Hoje</p>
               <img 
               alt="icons do tempo"
               src={`https://openweathermap.org/img/wn/${weatherdata.list[0].weather[0].icon}@2x.png`} 
               height='100px'></img>
               <p>{weatherdata.list[0].weather[0].description}</p>
            </div>
         </div>
         </div>
         ): null}
      </>
  )
}
