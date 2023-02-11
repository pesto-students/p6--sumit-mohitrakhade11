import config from "../constants.js";
import axios from "axios";
import { sendError, sendSuccess } from "../utilities/response.js";

const getWeatherDataForCity = async (req, res) => {
	try {
		let data;
		try {
			data = await axios.get(`${config.API_BASE_URL}weather?q=${req.params.city}&appid=${config.API_KEY}`);
			if (req.url) {
				res.send(sendSuccess(data.data));
			} else {
				return data.data;
			}
		} catch (error) {
			if (req.url) {
				res.send(sendError(error));
			} else {
				return error;
			}
		}
	} catch (error) {
		res.send(error);
	}
};

const getWeatherDataForListOfCities = async (req, res) => {
	try {
		if (req.params.cities) {
			let resArr = [];
			await Promise.all(req.params.cities.split(",").map(async (city) => resArr.push(await getWeatherDataForCity({ params: { city: city } }))));
			res.send(sendSuccess(resArr));
		} else {
			let cities = ["london", "delhi", "moscow", "meerut", "paris", "ahmedabad", "mumbai", "chennai", "kolkata", "new york"];
			let resArr = [];
			await Promise.all(cities.map(async (city) => resArr.push(await getWeatherDataForCity({ params: { city: city } }))));
			res.send(sendSuccess(resArr));
		}
	} catch (error) {
		res.send(sendError(error));
	}
};

const getWeatherDataForecast = async (req, res) => {
	try {
		let data;
		try {
			data = await axios.get(`${config.API_BASE_URL}forecast?q=${req.params.city}&appid=${config.API_KEY}`);
			if (req.url) {
				if (req.params.numberofdays) {
					let newData = [];
					let k, count;
					for (let i = 0; i < req.params.numberofdays; i++) {
						for (let j = 0; j < 8; j++) {
							if (i === 0 && data.data.list[j].dt_txt.includes(data.data.list[0].dt_txt.split(" ")[0])) {
								count++;
								newData.push(data.data.list[j]);
								k = j;
								k++;
							} else {
								if (i === 0) {
									continue;
								}
								if (i === req.params.numberofdays - 1 && j < 8 - count) {
									newData.push(data.data.list[k++]);
								} else {
									newData.push(data.data.list[k++]);
								}
							}
						}
					}
					data.data.list = newData;
				}
				res.send(sendSuccess(data.data));
			} else {
				if (req.params.numberofdays) {
					let newData = [];
					let k, count;
					for (let i = 0; i < req.params.numberofdays; i++) {
						for (let j = 0; j < 8; j++) {
							if (i === 0 && data.data.list[j].dt_txt.includes(data.data.list[0].dt_txt.split(" ")[0])) {
								count++;
								newData.push(data.data.list[j]);
								k = j;
								k++;
							} else {
								if (i === 0) {
									continue;
								}
								if (i === req.params.numberofdays - 1 && j < 8 - count) {
									newData.push(data.data.list[k++]);
								} else {
									newData.push(data.data.list[k++]);
								}
							}
						}
					}
					data.data.list = newData;
				}
				return data.data;
			}
		} catch (error) {
			if (req.url) {
				res.send(sendError(error));
			} else {
				return error;
			}
		}
	} catch (error) {
		res.send(error);
	}
};

const getWeatherDataForecastList = async (req, res) => {
	try {
		if (req.params.cities && req.params.numberofdays) {
			let resArr = [];
			await Promise.all(req.params.cities.split(",").map(async (city) => resArr.push(await getWeatherDataForecast({ params: { city: city, numberofdays: req.params.numberofdays } }))));
			res.send(sendSuccess(resArr));
		} else if (req.params.cities) {
			let resArr = [];
			await Promise.all(req.params.cities.split(",").map(async (city) => resArr.push(await getWeatherDataForecast({ params: { city: city } }))));
			res.send(sendSuccess(resArr));
		} else {
			let cities = ["london", "delhi", "moscow", "meerut", "paris", "ahmedabad", "mumbai", "chennai", "kolkata", "new york"];
			let resArr = [];
			await Promise.all(cities.map(async (city) => resArr.push(await getWeatherDataForecast({ params: { city: city } }))));
			res.send(sendSuccess(resArr));
		}
	} catch (error) {
		res.send(sendError(error));
	}
};

export { getWeatherDataForCity, getWeatherDataForListOfCities, getWeatherDataForecastList };
