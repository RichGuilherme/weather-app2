import './App.css'
import React, {useEffect, useState, useContext}from 'react';

import {DataWeather}  from './context/DataWeatherContent';

import MainWeather from './componentes/MainWeather/MainWeather';
import InformationWeather from './componentes/InformationWeather/InformationWeather';
import ForecastWeekdays from './componentes/ForecastWeekdays/ForecastWeekdays';
import Explore from './componentes/Explore/Explore';

import {fundoDia} from './componentes/imagemIcon';
import {fundoNoite} from './componentes/imagemIcon'


function App() {
    const [imagem, setImage] = useState(null);
    const [ativeExplore, setExplore] = useState(false)     
 
    const {weatherDatas} = useContext(DataWeather)
    const weatherdata = weatherDatas?.data
    
    
    useEffect(() => {
     const largula = () => {
      if ( window.innerWidth < 1307) {
         setExplore(true)
      }else {
         setExplore(false)
      }


      //  width < 1307 ? setExplore(true) : setExplore(false)

     }
       largula()
       window.addEventListener("resize", largula)

       return () => window.removeEventListener("resize", largula)
    },[])
    
    
     useEffect(() => {
       if (weatherdata !== null) {
         const description = weatherdata?.list[0].weather[0].description?.toLowerCase()
         let imageUrl = null;
         let diaOuNoite = weatherdata?.list[0].weather[0].icon?.includes("d")
       if(diaOuNoite === true) {
         if ((weatherdata.list[0].main.temp).toFixed() < 0 && description.includes("neve") === false) {
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
         } else if (description.includes('névoa') || description.includes("neblina")){
           imageUrl = fundoDia.nevoa
         } 
       }
             if(diaOuNoite === false){
             if ((weatherdata.list[0].main.temp).toFixed() < 0 && description.includes("neve") === false) {
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


  return (
    <>
        <div className='app'>
    
          <main style={{backgroundImage: `url(${imagem}) `}}>

              <div className='container-contents'>
                   <div className='topo-main'>
                        <h1> Clima </h1>
                        {ativeExplore && <Explore />} 
                   </div>

                    <MainWeather /> 
              </div>
    
             <section id='sideBar-contents'> 
                {!ativeExplore && <Explore />} 
                <ForecastWeekdays />
                <InformationWeather />
             </section>
         </main>
        </div>
      
    </>
  )
}

export default App



