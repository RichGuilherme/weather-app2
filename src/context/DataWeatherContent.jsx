import { useState, useEffect, createContext} from "react";
import axios from "axios";


export const DataWeather = createContext()

const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
const apiKeyWeather = process.env.REACT_APP_KEY


function ApiProvider ({children}) {
    const [cityname, setCityname] = useState(null)
    const [weatherDatas, setWeatherdata] = useState(null)
    const [loading, setLoading] = useState(true)
    
    const getData = async (city) => {
        try{
                const data = await axios.get(baseUrl + `q=${city !== null ? city : "belo horizonte"}&lang=pt_br&units=metric&appid=${apiKeyWeather}`);
                setWeatherdata(data) 
                setLoading(false)
    
            }catch(error) {
               console.log("erro")
            }
        }
     
    useEffect(() => {
         getData(cityname)
        
    },[cityname])

    return (
         <DataWeather.Provider value={{weatherDatas, setCityname, cityname, loading}}>
            {children}
         </DataWeather.Provider>
    )
}

export default ApiProvider