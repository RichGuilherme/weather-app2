import './App.css'
import { useEffect, useState } from 'react';

import MainWeather from './componentes/MainWeather/MainWeather';
import InformationWeather from './componentes/InformationWeather/InformationWeather';
import ForecastWeekdays from './componentes/ForecastWeekdays/ForecastWeekdays';
import Explore from './componentes/Explore/Explore';
import { useImageUrl } from './hooks/useImageUrl';


function App() {
  const [ativeExplore, setExplore] = useState(false)
  const { imagem } = useImageUrl()

  useEffect(() => {
    const largula = () => {
      if (window.innerWidth < 1307) {
        setExplore(true)
      } else {
        setExplore(false)
      }
    }

    largula()
    window.addEventListener("resize", largula)

    return () => window.removeEventListener("resize", largula)
  }, [])


  return (
    <main style={{ backgroundImage: `url(${imagem}) ` }}>

      <div className='container-contents'>
        <div className='topo-main'>
          <h1> Clima </h1>
          {ativeExplore &&
            <Explore />}
        </div>

        <MainWeather />
      </div>

      <aside id='sideBar-contents'>
        {!ativeExplore &&
          <Explore />}

        <ForecastWeekdays />
        <InformationWeather />
      </aside>
    </main>
  )
}

export default App



