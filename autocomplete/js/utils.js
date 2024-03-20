import {CARS} from "./data.js";

export const getSuggestions = (keyword) => {
    const result = CARS.filter(car => car.toLowerCase().startsWith(keyword.toLowerCase()));
    return result;
};