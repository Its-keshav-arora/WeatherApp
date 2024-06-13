import React, { useState } from "react";

// for the input box of the weather app
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";

// Importing the weather card
import WeatherCard from "./weatherCard";

// importing the Error Page
import Error from "./Error";

export default function SearchBox({ apikey }) {
  const [city, setCity] = useState("");
  const [CitySearched, setCitySearched] = useState(false);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [weather, setWeather] = useState({
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
    wind: {
      speed: "",
    },
  });

  const URL = "http://api.openweathermap.org/geo/1.0/direct"; // URL of the geoCoordinates API
  const API_KEY = apikey;// API key of geoCoordinates API

  const WeatherURL = "https://api.openweathermap.org/data/2.5/"; // URL of the Weather API

  const getGeoCoordinates = async () => {
    try {
      let response = await fetch(`${URL}?q=${city}&appid=${API_KEY}`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      let JsonResponse = await response.json();
      return JsonResponse;
    } catch (error) {
      console.error('Error fetching geo coordinates:', error);
      return null; // Return null in case of error
    }
  };

  const getWeatherInfo = async (lat, lng) => {
    try {
      let currWeather = await fetch(
        `${WeatherURL}weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
      );
      let jsonResponse = await currWeather.json();
      return jsonResponse;
    } catch (error) {
      console.error('Error fetching weather info:', error);
      return null; // Return null in case of error
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCity("");
    let geoCoordinates = await getGeoCoordinates(); // Extract the geo coordinates from the city.
    if (geoCoordinates && geoCoordinates.length > 0) {
      let latitude = geoCoordinates[0].lat; // Latitude of the city.
      let longitude = geoCoordinates[0].lon; // Longitude of the city.
      let finalData = await getWeatherInfo(latitude, longitude);
      if (finalData) {
        setWeather(finalData);
        setCitySearched(true); 
        setCityNotFound(false);
      } else {
        // console.error('No weather data found');
        setCitySearched(false);
        setCityNotFound(true);
      }
    } else {
      // console.error('No geo coordinates found');
      setCitySearched(false);
      setCityNotFound(true)
    }
  };

  const handleOnChange = (event) => {
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
          sx={{ minWidth: 340 }}
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
      {cityNotFound && <Error></Error>}
    </>
  );
}
