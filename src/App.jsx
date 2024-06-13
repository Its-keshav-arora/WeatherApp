import React from 'react'
import SearchBox from "./components/SearchBox"


function App() {

  const API_KEY = process.env.REACT_APP_API_KEY;
  console.log(process.env.REACT_APP_API_KEY);

  return (
    <div>
        <h1 className="text-center text-4xl mt-6"><span className=" bg-gradient-to-r bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text font-bold    text-transparent ">Weather App</span></h1>
          <SearchBox apikey={API_KEY}> </SearchBox>
    </div>
  )
}

export default App
