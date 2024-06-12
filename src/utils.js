function unixTimeToHMS(unixTime) {
    // Convert Unix time to milliseconds
    const date = new Date(unixTime * 1000);
    
    // Get hours, minutes, and seconds
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
}

function KelvinToDegree(temp)
{
    return (temp-273.15).toFixed(2);
}

export {unixTimeToHMS};
export {KelvinToDegree};