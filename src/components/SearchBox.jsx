import React, { useState } from "react";

// for the input box of the weather app
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

// Importing the weather card
import WeatherCard from "./weatherCard";

export default function SearchBox() {
  let [city, setCity] = useState("");
  // let [CitySearched, setCitySearched] = useState(false);
  let [weather, setWeather] = useState({
    main: {
      temp: "",
      feels_like: "",
    },
    name: "",
    sys: {
      sunrise: "",
      sunset: "",
    },
    weather: [
      {
        main: "",
      },
    ],
  });

  let URL = "http://api.openweathermap.org/geo/1.0/direct"; // URL of the geoCoordinates API
  let API_KEY = "0e32daf1c63f166b160aef66bb63af51"; // API key of geoCoordinates API

  let WeatherURL = "https://api.openweathermap.org/data/2.5/"; // URL of the Weather API

  let getGeoCoordinates = async () => {
    setCitySearched(true);
    let response = await fetch(`${URL}?q=${city}&appid=${API_KEY}`);
    let JsonResponse = await response.json();
    return JsonResponse;
  };

  let getWeatherInfo = async (lat, lng) => {
    let currWeather = await fetch(
      `${WeatherURL}weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    );
    let jsonResponse = await currWeather.json();
    return jsonResponse;
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(city);
    setCity("");
    let geoCoordinates = await getGeoCoordinates(); // Extracted the geo coordinates from City.
    let latitude = geoCoordinates[0].lat; // Latitude of the city.
    let longitude = geoCoordinates[0].lon; // longitude of the city.
    let finalData = await getWeatherInfo(latitude, longitude);
    console.log(finalData.weather);
    console.log(finalData);
    // setWeather(finalData);
  };

  let handleOnChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <>
      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& > :not(style)": { m: 1, textAlign: "center" },
        }}
        autoComplete="off"
        className="flex justify-center items-center mt-8 mb-4"
        name="form"
      >
        <TextField
          name="city"
          id="outlined-basic"
          label="City"
          variant="outlined"
          className="w-4/12 relative left-8"
          sx={{ minWidth: 250 }}
          // name="city"
          value={city}
          onChange={handleOnChange}
        />
        <IconButton
          type="submit"
          className="relative right-8"
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {CitySearched && <WeatherCard data={weather}></WeatherCard>}
    </>
  );
}
