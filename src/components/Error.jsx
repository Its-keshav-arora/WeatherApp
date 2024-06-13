import React from 'react'
import CardMedia from "@mui/material/CardMedia";
import "./style.css"

export default function Error() {
  return (
    <div className='flex justify-center align-center error p-4'>
      <div className='border-4 border-gray-700 rounded-lg mt-8'>
      <CardMedia
      className="weatherImage"
        component="img"
        sx={{ width: "25%", height: "25%", minWidth: 330, minHeight: 330, padding:"2rem" }}
        image="/animations/Error.gif"
        alt="Current Weather Details"
      />
      <h1 className='text-3xl font-semibold text-center pb-4'><span className='text-red-600'>404 : </span> City not found</h1>
      </div>
    </div>
  )
}
