import { useContext, useEffect, useState } from 'react'
import { DataWeather } from '../context/DataWeatherContent'
import { fundoDia, fundoNoite } from '../componentes/imagemURLs'

export const useImageUrl = () => {
    const [imagem, setImage] = useState(null);

    const { weatherDatas } = useContext(DataWeather)
    const weatherdata = weatherDatas?.data


    useEffect(() => {
        if (weatherdata) {
            let description = weatherdata?.list[0].weather[0].main?.toLowerCase()
            let imageUrl = undefined
            let morningNow = weatherdata?.list[0].weather[0].icon?.includes("d")

            if (morningNow === true) {
                if ((weatherdata.list[0].main.temp).toFixed() < 0 && description.includes("snow") === false) {
                    imageUrl = fundoDia.dayCold
                }

                switch (description) {
                    case "clear sky":
                        imageUrl = fundoDia.ceuLimpo
                        break;

                    case "clouds":
                        imageUrl = fundoDia.cidadeNublada
                        break;

                    case "rain":
                    case "drizzle":
                        imageUrl = fundoDia.chuva
                        break;

                    case "trunderstorm":
                        imageUrl = fundoDia.trovoadaNaCidade
                        break;

                    case "snow":
                        imageUrl = fundoDia.nevandoNaCidade
                        break;

                    case "mist":
                        imageUrl = fundoDia.nevoa
                        break;

                    default:
                        imageUrl = fundoDia.ceuComPoucasNuvens
                }
            }

            if (morningNow === false) {
                if ((weatherdata.list[0].main.temp).toFixed() < 0 && description.includes("snow") === false) {
                    imageUrl = fundoNoite.dayCold
                }

                switch (description) {
                    case "clear sky":
                        imageUrl = fundoNoite.ceuLimpo
                        break;

                    case "clouds":
                        imageUrl = fundoNoite.cidadeNublada
                        break;

                    case "rain":
                    case "drizzle":
                        imageUrl = fundoNoite.chuva
                        break;

                    case "trunderstorm":
                        imageUrl = fundoNoite.trovoadaNaCidade
                        break;

                    case "snow":
                        imageUrl = fundoNoite.nevandoNaCidade
                        break;

                    case "mist":
                        imageUrl = fundoNoite.nevoa
                        break;

                    default:
                        imageUrl = fundoNoite.ceuComPoucasNuvens
                }
            }

            setImage(imageUrl)
        }
    }, [weatherdata]);
   
    return {imagem}
}
