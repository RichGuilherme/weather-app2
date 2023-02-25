import { useState, useEffect} from "react"
import '../styles/WeatherMain.css'
import {getWeatherData} from './WeatherApi'

export default function WeatherMain(props) {
  const [weatherdata, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [horasLocais, setHorasLocais] = useState(0)

  const getData = async (city) => {
  try{
        const data = await getWeatherData(city ? city : "Belo horizonte")
        setWeatherData(data)
        setLoading(false)
       
        if (data && data.timezone) {
          const timezoneOffset = data.timezone / 3600;
          setHorasLocais(timezoneOffset);
        }
      }catch(error) {
        setLoading(false)
      }
    }
  

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

  useEffect(() => {
      getData(props.city)
      
   }, [props.city])

  return (
    <>

        {weatherdata !== null ? (
        <>
         <p className="temperatura"><span>{(weatherdata.main.temp).toFixed()}</span>&deg;</p>

         <div className="container-main-weather">
            <div className='location-and-date'>
              <span>{weatherdata.name}-{weatherdata.sys.country}</span>
              <span>{relogio}-{date()}</span> 
            </div>
            
            <div className='weather-daily'>
               <p>Hoje</p>
               <img src={`http://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} height='100px'></img>
               <p>{weatherdata.weather[0].description}</p>
            </div>
         </div>
         </>
         ): null}
      </>
  )
}
