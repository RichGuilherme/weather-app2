import '../styles/ForecastWeekdays.css'
import { useState, useEffect } from 'react'
import {getWeatherWeekDays} from './WeatherApi'


export function ForecastWeekdays (props) {
    const [weatherdata, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [forecast, setForecast] = useState([]);
    
    const getData = async (city) => {
         try{
             const data = await getWeatherWeekDays(city ? city : "Belo horizonte")
             
               setWeatherData(data)
               setLoading(false)

              
             }catch(error) {
             setLoading(false)
           }
         }
         
         useEffect(() => {
             getData(props.city)
             
         }, [props.city])

         useEffect(() => {
            if (weatherdata) {
                const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

                const filtrarForecast = weatherdata.list.filter((forecast, index) => index % 8 === 0)

                const mapearForecast = filtrarForecast.map(forecast => {
                    const date = new Date(forecast.dt_txt)
                    const dayOfWeek = diasDaSemana[date.getDay()]
    
                    return dayOfWeek
                })


                const weekTemp_min = filtrarForecast.map(forecast => {
                     const temp_min = forecast.main.temp_min

                     return temp_min
                })
                const weekTemp_max = filtrarForecast.map(forecast => {
                     const temp_max = forecast.main.temp_max

                     return temp_max
                })
               
                
                setForecast(mapearForecast)
              }
            }, [weatherdata]);
        
        
        
    

return (
        <>
        {weatherdata !==  null? (
          <>
           <h1>Dias da Semana</h1>
           
           <div className="container-weekdays">
                 <div className="day">
                 {forecast.length > 0 ? (
                        <ul>
                            {forecast.map((day, index) => (
                                  <li key={index}>
                                    {day} <div className="temp">
                                              <img src={`http://openweathermap.org/img/wn/${weatherdata.list[index].weather[0].icon}@2x.png`} height='50px'></img>
                                              <span>{(weatherdata.list[index].main.temp_max).toFixed()}&deg;</span>/
                                              <span>{(weatherdata.list[index].main.temp_min).toFixed()}&deg;</span>
                                          </div>
                                  </li>
                             ))}
                        </ul>
                    ) : "Erro"}
                 </div>
           </div>
           </>
           ) : null}
        </>
    
    )
}
