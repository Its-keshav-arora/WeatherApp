function unixTimeToHMS(unixTime) {
  // Convert Unix time to milliseconds
  const date = new Date(unixTime * 1000);

  // Add 5 hours and 30 minutes to UTC time for India timezone
  date.setMinutes(date.getMinutes() + 330); // 5 hours * 60 minutes + 30 minutes = 330 minutes

  // Get hours, minutes, and seconds
  let hours = date.getUTCHours().toString().padStart(2, "0");
  let minutes = date.getUTCMinutes().toString().padStart(2, "0");
  hours = hours % 12;

  return `${hours}:${minutes}`;
}

function KelvinToDegree(temp) {
  return (temp - 273.15).toFixed(2);
}

function windDirection(degrees) {
    let direction;
    
    switch (true) {
        case (degrees >= 0 && degrees < 22.5) || (degrees >= 337.5 && degrees <= 360):
            direction = 'North';
            break;
        case (degrees >= 22.5 && degrees < 67.5):
            direction = 'North-East';
            break;
        case (degrees >= 67.5 && degrees < 112.5):
            direction = 'East';
            break;
        case (degrees >= 112.5 && degrees < 157.5):
            direction = 'South-East';
            break;
        case (degrees >= 157.5 && degrees < 202.5):
            direction = 'South';
            break;
        case (degrees >= 202.5 && degrees < 247.5):
            direction = 'South-West';
            break;
        case (degrees >= 247.5 && degrees < 292.5):
            direction = 'West';
            break;
        case (degrees >= 292.5 && degrees < 337.5):
            direction = 'North-West';
            break;
    }
    
    return direction;
}



export { unixTimeToHMS };
export { KelvinToDegree };
export {windDirection};

