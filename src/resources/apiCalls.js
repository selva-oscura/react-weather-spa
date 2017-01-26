import axios from 'axios';
import { openWeather } from './apis.json';

const weatherQueries = {
	singleForecastWeatherAPI: function(city, country, id, tempFormat){
		let apiCall =`${openWeather.baseURL}forecast`;
		if(id){
			apiCall += `city?id=${id}`;
		}else{
			apiCall += `?q=${city},${country}`;
		}
		apiCall += `&appid=${openWeather.apiKey}&units=${tempFormat}`;
		console.log('apiCall', apiCall);
		return axios.get(apiCall)
			.then((response) => {
				console.log('response', response)
				return response;
			}).catch((error) => {
				console.log('error', error)
				throw error;
			});
	},
	multiQueryWeatherAPI: function(idsArray, tempFormat){
		console.log('multi-location query to go here');
		return null;
	}
}

export default weatherQueries;