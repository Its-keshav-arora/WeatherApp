import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Importing the required functions and style sheets.
import { unixTimeToHMS, KelvinToDegree, windDirection, weatherImage } from "../utils";
import './style.css';


export default function WeatherCard({ data }) {
  function CurrentTime() {
    // Define the state to hold the current time
    const [currentTime, setCurrentTime] = useState(getCurrentTime());

    // Use useEffect to set up an interval that updates the time every second
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(getCurrentTime());
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, []);

    // Function to get the current time in HH:MM:SS format
    function getCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      if(hours >=12)
        {
          return `${hours%12}:${minutes} p.m`;
        }
      else
      {
        return `${hours}:${minutes} a.m`;
      }
      
    }

    return <span>{currentTime}</span>;
  }

  return (
    <Card
      className="mx-8 border-2 border-black weatherCard"
      sx={{ display: "flex", borderRadius: "1rem" }}
    >
      <CardMedia
      className="weatherImage"
        component="img"
        sx={{ width: "25%", height: "25%", minWidth: 330, minHeight: 330, paddingLeft:"2rem" }}
        image={weatherImage(data.weather[0].main)}
        alt="Current Weather Details"
      />
      <Box className="cardContent" sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div>
            <Typography
              className="flex justify-between items-center "
              component="div"
              variant="h4"
            >
              <span>Current Weather <span className="forecast">Forecast</span>{" "}</span>
              <span className="pr-4 text-3xl initialTempShow">
                Current Temp : {(KelvinToDegree(data.main.temp) - 1.23).toFixed(2)} &deg;C
              </span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="flex justify-between "
            >
              {data.name}
              <span className="pr-4 text-xl text-black initialTempShow">
                Feels Like : {(KelvinToDegree(data.main.feels_like + 1.62))} &deg;C
              </span>
            </Typography>

            <Typography component="div">
            <span className="pr-4 text-xl tempShow">
                Current Temp : {KelvinToDegree(data.main.temp)} &deg;C
              </span>
              <span className="pr-4 text-xl text-black tempShow">
                Feels Like : {KelvinToDegree(data.main.feels_like)} &deg;C
              </span>
              <span className="text-xl">Status: {data.weather[0].main} </span>
            </Typography>
            <Typography component="div" className="SunRiseDiv">
              <span className="text-xl mr-20">
                Sunrise: {unixTimeToHMS(data.sys.sunrise)} a.m{" "}
              </span>
              <span className="text-xl">
                Sunset: {unixTimeToHMS(data.sys.sunset)} p.m{" "}
              </span>
            </Typography>
            <Typography component="div" className="SunRiseDiv">
              <span className="text-xl mr-6 pr-1">
                Windspeed: {(data.wind.speed * 3.6).toFixed(2)} km/hr{" "}
              </span>
              <span className="text-xl">
                Direction: {windDirection(data.wind.deg)}
              </span>
            </Typography>
            <Typography component="div">
              <span className="text-xl mr-8">
                Current Time: <CurrentTime /> {" "}
              </span>
            </Typography>
          </div>
        </CardContent>
      </Box>
    </Card>
  );
}
