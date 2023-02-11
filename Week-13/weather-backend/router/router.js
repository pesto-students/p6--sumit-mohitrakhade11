import { Router as expressRouter } from "express";
import { getWeatherDataForCity, getWeatherDataForListOfCities, getWeatherDataForecastList } from "../controller/controller.js";

const router = expressRouter();

router.use((req, res, next) => {
	next();
});

//  Current Weather Conditions of Predefined Multiple Cities
router.get("/weather/list", getWeatherDataForListOfCities);

//  Current Weather Conditions of Multiple Cities
router.get("/weather/list/:cities", getWeatherDataForListOfCities);

//  Current Weather Conditions of Any Particular City
router.get("/weather/:city", getWeatherDataForCity);

//  Forecast Weather Conditions of Predefined Multiple Cities
router.get("/weather/forecast/list", getWeatherDataForecastList);

//  Forecast Weather Conditions of Multiple Cities For Number Of Days
router.get("/weather/forecast/list/:cities/:numberofdays", getWeatherDataForecastList);

export default router;
