import axios from 'axios';
import { openWeather, timeZoneDB } from './apis.json';

const apiCalls = {
	//openWeather
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
				console.log('openWeather response', response)
				return response;
			}).catch((error) => {
				console.log('openWeather error', error)
				throw error;
			});
	},
	multiQueryWeatherAPI: function(idsArray, tempFormat){
		console.log('multi-location query to go here');
		return null;
	},
	//timeZoneDB
	latLonOffsetFromUTCAPI: function(lat, lon){
		let apiCall = `${timeZoneDB.baseURL}get-time-zone?key=${timeZoneDB.apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
		console.log('apiCall', apiCall);
		return axios.get(apiCall)
			.then((response) => {
				console.log('timeZoneDB response', response);
				return response;
			}).catch((error) =>{
				console.log('timeZoneDB error', error);
				throw error;
			});
	}
}

export default apiCalls;