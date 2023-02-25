import './styles/App.css'
import React, {useEffect, useState}from 'react';
import WeatherMain from './componentes/WeatherMain';
import {WeatherDetails} from './componentes/DetailWeather';
import {ForecastWeekdays} from './componentes/ForecastWeekdays';
import iconExplore from './assets/iconExplore.svg';
import {getWeatherData} from './componentes/WeatherApi'


function App() {
    const [pesquisar, setPesquisar] = useState('');
    const [city, setCity] = useState('')
    const [weatherdata, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [imagem, setImage] = useState(null);
         
    const handlerCity = () => {
        setCity(pesquisar)
        getData(city)
    }
    
   const handlerPressKey = (event) => {
        if(event.key === "Enter"){
          handlerCity()
        }
   } 
    
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
         getData(city)
         
    }, [city])
    
    useEffect(() => {
      if (weatherdata) {
        const description = weatherdata?.weather[0].description?.toLowerCase()


        let imageUrl = null;
        let diaOuNoite = weatherdata?.weather[0].icon?.includes("d")

      if(diaOuNoite) {
        if ((weatherdata.main.temp).toFixed() < 0 && description.includes("neve") === false) {
          imageUrl = require('./assets/backgroundDia/day-cold.jpg')

        } else if (description.includes('limpo')){
          imageUrl = require( './assets/backgroundDia/ceu-limpo.jpg')
  
        } else if (description.includes('nublado')) {
          imageUrl = require('./assets/backgroundDia/cidade-nublada.jpg')

        } else if (description.includes('nuvens') ){
          imageUrl = require('./assets/backgroundDia/ceu-com-poucas-nuvens.jpg')

        } else if (description.includes('chuva')  || description.includes("chuvisco")) {
          imageUrl = require('./assets/backgroundDia/chuva.jpg')

        } else if (description.includes('trovoada')){
          imageUrl = require('./assets/backgroundDia/trovoada-na-cidade.jpg')

        } else if (description.includes('neve')){
          imageUrl = require('./assets/backgroundDia/nevando-na-cidade.jpg')

        } else if (description.includes('névoa')){
          imageUrl = require('./assets/backgroundDia/névoa.jpg')
        } 
      } else {
            if ((weatherdata.main.temp).toFixed() < 0 && description.includes("neve") === false) {
              imageUrl = require('./assets/backgroundNoite/day-cold.jpg')
    
            } else if (description.includes("limpo")){
              imageUrl = require('./assets/backgroundNoite/ceu-limpo.jpg')
      
            } else if (description.includes('nublado')) {
              imageUrl = require('./assets/backgroundNoite/cidade-nublada.jpg')
    
            } else if (description.includes('nuvens') ){
              imageUrl = require('./assets/backgroundNoite/ceu-com-poucas-nuvens.jpg')
    
            } else if (description.includes('chuva')  || description.includes("chuvisco")) {
              imageUrl = require('./assets/backgroundNoite/chuva.jpg')
    
            } else if (description.includes('trovoada')){
              imageUrl = require('./assets/backgroundNoite/trovoada-na-cidade.jpg')
    
            } else if (description.includes('neve')){
              imageUrl = require('./assets/backgroundNoite/nevando-na-cidade.jpg')
    
            } else if (description.includes('névoa')){
              imageUrl = require('./assets/backgroundNoite/névoa.jpg')
            } 

      }

        setImage(imageUrl)
      }
    }, [weatherdata]);


    const btnBumburgue = () => {
      const aside = document.querySelector('#aside')
      setTimeout(() => {
        aside.style.display = "block"
        
      }, 200);
    }

    const btnClose = () => {
      const aside = document.querySelector('#aside')

       aside.style.display = "none"
    }



  return (
    <>
      {weatherdata !== null ? (
        <div className='app' style={{backgroundImage: `url(${imagem}) `}}>
    
          <main>
              <div className='topo-main'>
                   <h1> Clima </h1>
                   <div className='btn-hamburgue-box' onClick={btnBumburgue}>
                       <div className='btn-hamburgue'></div>
                   </div>
              </div>

              <div className='container-Weather'>
                   <WeatherMain city={city}/>
              </div>
          </main>
    
          <aside id='aside'> 
             <div className='topo-aside'>

              <div className='btn-close-box' onClick={btnClose}>
                       <div className='btn-close'></div>
              </div>

              <div className='container-explore'>
                    <div className='explore'>
                        <input
                        className='search-text'
                        type='input'
                        value={pesquisar}
                        onChange={(e) => setPesquisar(e.target.value)}
                        onKeyDown={handlerPressKey}
                        placeholder='Procura cidade'>
                        </input>         
                        <button type="submit" className='search-btn'  onClick={handlerCity}>
                                 <img src={iconExplore} height='22px' alt='iconExplore'></img> 
                        </button>
                    </div>
                </div>
             </div>
                <ForecastWeekdays city={city}/>
                <WeatherDetails city={city}/>
          </aside>
        </div>
      

      ) : null }
    </>
  )
}

export default App

// criar uma tag icon para fazer animação

