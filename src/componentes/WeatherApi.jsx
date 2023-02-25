import axios from 'axios';


// Api com Dados de hoje
const baseUrl1 = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKeyWeather = '6116c84adaeffe63996b51da42b18bc3';

export const getWeatherData = async (cityname) => {

    
    try{
        const {data} = await axios.get(baseUrl1 + `q=${cityname}&lang=pt_br&units=metric&appid=${apiKeyWeather}`);
        return data;
    }catch(error) {
        throw error;
    }
}


// Api com Dados da semana

const baseUrl2 = 'http://api.openweathermap.org/data/2.5/forecast?';

export const getWeatherWeekDays = async (cityname) => {
    try{
        const {data} = await axios.get(baseUrl2 + `q=${cityname}&lang=pt_br&units=metric&appid=${apiKeyWeather}`);
        return data;
    }catch(error) {
        throw error;
    }
}