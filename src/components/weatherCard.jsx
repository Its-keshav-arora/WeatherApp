import React from "react";

// Importing Components for the Card Implementation:
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

// Importing the required Functions:
import { unixTimeToHMS } from "../utils";
import { KelvinToDegree } from "../utils";

export default function WeatherCard({ data }) {
  return (
    <Card
      className="mx-8 border-2 border-black"
      sx={{ display: "flex", borderRadius: "1rem" }}
    >
      <CardMedia
        component="img"
        sx={{ width: "25%", height: "25%", minWidth: 330, minHeight: 330 }}
        image="/animations/Rain.gif"
        alt="Current Weather Details"
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div>
            <Typography
              className="flex justify-between items-center "
              component="div"
              variant="h4"
            >
              Current Weather Forecast{" "}
              <span className="pr-4 text-xl">
                Current Temp : {KelvinToDegree(data.main.temp)} &deg;C
              </span>
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              className="flex justify-between "
            >
              {data.name}
              <span className="pr-4 text-xl text-black">
                Feels Like : {KelvinToDegree(data.main.feels_like)} &deg;C
              </span>
            </Typography>

            <Typography
              component="div"
            >
              <span className="text-xl">Status: {data.weather[0].main} </span>
            </Typography>
            
          </div>
        </CardContent>
      </Box>
    </Card>

    // <div className="flex justify-center items-center mt-8">
    //   <Card className="border-2 border-black" sx={{ minWidth: 270, width: "28%", borderRadius:"1rem", }}>
    //     <CardActionArea>
    //       <CardMedia
    //         component="img"
    //         height="140"
    //         image="/animations/Rain.gif"
    //         alt="current Weather Condition"
    //         className="rounded-full"
    //       />
    //       <CardContent>
    //         <Typography gutterBottom variant="h5" component="div">
    //           Current Weather
    //         </Typography>
    //         <Typography variant="body2" color="text.secondary">
    //           Lizards are a widespread group of squamate reptiles, with over
    //           6,000 species, ranging across all continents except Antarctica
    //         </Typography>
    //       </CardContent>
    //     </CardActionArea>
    //   </Card>
    // </div>
  );
}
