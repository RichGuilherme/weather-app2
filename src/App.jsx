import './styles/App.css'
import React, {useEffect, useState}from 'react';
import WeatherMain from './componentes/WeatherMain';
import {WeatherDetails} from './componentes/DetailWeather';
import {ForecastWeekdays} from './componentes/ForecastWeekdays';
import {getWeatherData} from './componentes/WeatherApi'
import {fundoDia} from './componentes/imagemIcon';
import {fundoNoite} from './componentes/imagemIcon'
import  explore  from './assets/iconExplore.svg';

function App() {
    const [pesquisar, setPesquisar] = useState('');
    const [city, setCity] = useState('')
    const [weatherdata, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [imagem, setImage] = useState(null);
         
    const handlerCity = (event) => {
       const inputExplore = document.querySelector('.search-text')

       if(inputExplore.value !== ""){
         setCity(pesquisar)
         getData(city)
       } 

        // Caso o input for em uma tela menor, ao executar a pesquisa a aba aside será desligada

        let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
        
        if(inputExplore.value !== ''){
          if(width <= 950){
               const aside = document.querySelector('#aside')
 
               aside.style.display = "none"
          }
        }

     
         setPesquisar('')
         inputExplore.value = ''
        

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

      if(diaOuNoite === true) {

        if ((weatherdata.main.temp).toFixed() < 0 && description.includes("neve") === false) {
          imageUrl = fundoDia.dayCold

        } else if (description.includes('limpo')){
          imageUrl = fundoDia.ceuLimpo
  
        } else if (description.includes('nublado')) {
          imageUrl = fundoDia.cidadeNublada

        } else if (description.includes('nuvens') ){
          imageUrl = fundoDia.ceuComPoucasNuvens

        } else if (description.includes('chuva')  || description.includes("chuvisco")) {
          imageUrl = fundoDia.chuva

        } else if (description.includes('trovoada')){
          imageUrl = fundoDia.trovoadaNaCidade

        } else if (description.includes('neve')){
          imageUrl = fundoDia.nevandoNaCidade

        } else if (description.includes('névoa')){
          imageUrl = fundoDia.nevoa
        } 
      }

            if(diaOuNoite === false){

            if ((weatherdata.main.temp).toFixed() < 0 && description.includes("neve") === false) {
              imageUrl = fundoNoite.dayCold
    
            } else if (description.includes("limpo")){
              imageUrl = fundoNoite.ceuLimpo
      
            } else if (description.includes('nublado')) {
              imageUrl = fundoNoite.cidadeNublada
    
            } else if (description.includes('nuvens') ){
              imageUrl = fundoNoite.ceuComPoucasNuvens
    
            } else if (description.includes('chuva')  || description.includes("chuvisco")) {
              imageUrl = fundoNoite.chuva
    
            } else if (description.includes('trovoada')){
              imageUrl = fundoNoite.trovoadaNaCidade
    
            } else if (description.includes('neve')){
              imageUrl =  fundoNoite.nevandoNaCidade
    
            } else if (description.includes('névoa')){
              imageUrl = fundoNoite.nevoa
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
                                 <img src={explore}  alt='iconExplore'></img> 
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

