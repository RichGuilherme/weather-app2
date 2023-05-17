import { useState,  useContext} from "react"
import {DataWeather}  from '../../context/DataWeatherContent';

import './MainWeather.css'



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
  

  const date = () => {
       let date = new Date()
       let day = date.getDate()
       let year = date.getFullYear().toString().substr(2, 4)
  
       
       let mont = date.getMonth()
       let mes = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Aug', 'Set', 'Out', 'Nov', 'Dez']
       let mesDoano = mes[mont]
  
       let daily = date.getDay()
       let week = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
       let diaDaSemana = week[daily]
  
       return ` ${diaDaSemana}, ${day} / ${mesDoano}'${year}`
  }

 
  return (
    <>
        {weatherdata !== undefined ? (
        <div>
         <p className="temperatura"><span>{(weatherdata.list[0].main.temp).toFixed()}</span>&deg;</p>

         <div className="container-main-weather">
            <div className='location-and-date'>
              <span>{weatherdata.city.name}-{weatherdata.city.country}</span>
              <span>{relogio}-{date()}</span> 
            </div>
            
            <div className='weather-daily'>
               <p>Hoje</p>
               <img src={`https://openweathermap.org/img/wn/${weatherdata.list[0].weather[0].icon}@2x.png`} height='100px'></img>
               <p>{weatherdata.list[0].weather[0].description}</p>
            </div>
         </div>
         </div>
         ): null}
      </>
  )
}
