import { useState, useContext, useEffect } from "react"

import './Explore.css'

import {DataWeather}  from '../../context/DataWeatherContent';
import  explore  from '../../assets/iconExplore.svg'

export default function Explore () {
  const [pesquisar, setPesquisar] = useState("")
  const [city, setCity] = useState(null)

  const {setCityname} = useContext(DataWeather)

  
  const handlerPressKey = (event) => {
    if(event.key === "Enter"){
      handlerCity()
    }
  } 
  
  const handlerCity = () => {
    const inputExplore = document.querySelector('.search-text')    
      setCity(pesquisar)

      setPesquisar('')
      inputExplore.value = ''
    }

    useEffect(() => {
           if(city !== null && city !== ""){
             setCityname(city)
           }
    }, [city, setCityname])
    

  return (
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
  )
}

