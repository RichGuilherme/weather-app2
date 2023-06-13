import './ForecastWeekdays.css'

import { useState, useEffect, useContext } from 'react'

import {DataWeather}  from '../../context/DataWeatherContent';

export default function ForecastWeekdays (props) {
    const {weatherDatas} = useContext(DataWeather)
    const weatherdata = weatherDatas?.data

    const [forecast, setForecast] = useState([]);

         useEffect(() => {
            if (weatherdata) {
                const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

                const filtrarForecast = weatherdata.list.filter((forecast, index) => index % 8 === 0)

                const mapearForecast = filtrarForecast.map(forecast => {
                    const date = new Date(forecast.dt_txt)
                    const dayOfWeek = diasDaSemana[date.getDay()]
    
                    return dayOfWeek
                })

                     filtrarForecast.map(forecast => {
                     const temp_min = forecast.main.temp_min

                     return temp_min
                })
                     filtrarForecast.map(forecast => {
                     const temp_max = forecast.main.temp_max

                     return temp_max
                })
               
                
                setForecast(mapearForecast)
              }
            }, [weatherdata]);
        
        
        
    

return (
        <>

          <section id='forecastWeather'>
           <h1>Dias da Semana</h1>
           
           <div className="container-weekdays">
                 <div className="day">
                 {forecast.length > 0 ? (
                        <ul>
                            {forecast.map((day, index) => (
                                  <li key={index}>
                                    {day} <div className="temp">
                                              <img
                                              alt= "icon do tempo"
                                              src={`https://openweathermap.org/img/wn/${weatherdata.list[index].weather[0].icon}@2x.png`} 
                                              height='50px'></img>
                                              <span>{(weatherdata.list[index].main.temp_max).toFixed()}&deg;</span>/
                                              <span>{(weatherdata.list[index].main.temp_min).toFixed()}<sup>&deg;c</sup></span>
                                          </div>
                                  </li>
                             ))}
                        </ul>
                    ) : "Erro"}
                 </div>
           </div>
           </section>
      
        </>
    
    )
}
