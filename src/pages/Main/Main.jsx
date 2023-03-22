import React from 'react'
import "./Main.css"
import { useEffect, useState } from 'react';
import axios from 'axios'
// import { backdropClasses } from '@mui/material';
import Sunny from "../../assets/sunny.jpg"
import Cloudy from "../../assets/cloud.jpg"
import Rainy from "../../assets/rain.jpg"
import Snow from "../../assets/snow.jpg"
import Image from "../../assets/image.jpg"
import Thunder from "../../assets/thounder.jpg"


export default function Main() {
    const [weatherData, setWeatherData] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [addInputValue, setAddInputValue] = useState("");

    useEffect(()=>{
        getWeatherData();
    },[addInputValue])

    const getWeatherData = async ()=> {
        const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0742e1cdce82430e90531909232103&q=${inputValue}&days=1&aqi=no&alerts=no`)
    
        setWeatherData({
          name: data.location.name,
          country: data.location.country,
          region: data.location.region,
          current: data.current.temp_c,
          high: data.forecast.forecastday[0].day.maxtemp_c,
          low: data.forecast.forecastday[0].day.mintemp_c,
          condition: data.current.condition.text,
          date: data.forecast.forecastday[0].date,
        });
    };

    const handleOnChange = (e)=>{
        e.preventDefault()
        setAddInputValue(inputValue);
        // setInputValue(""); 
    }

    return (
    <div
    className='search'
    style={weatherData.condition?.toLowerCase() === "clear" ||
    weatherData.condition?.toLowerCase() === "sunny"
    ? {backgroundImage: `url(${Sunny})`}

    : weatherData.condition?.toLowerCase().includes("cloudy") ||
    weatherData.condition?.toLowerCase().includes("overcast")
    ? { backgroundImage: `url(${Cloudy})`}

    : weatherData.condition?.toLowerCase().includes("rain") ||
    weatherData.condition?.toLowerCase().includes("mist") ||
    weatherData.condition?.toLowerCase().includes("drizzle")
    ? { backgroundImage: `url(${Rainy})`}

    : weatherData.condition?.toLowerCase().includes("thunder")
    ? { backgroundImage: `url(${Thunder})`}

    : weatherData.condition?.toLowerCase().includes("snow")
    ? { backgroundImage: `url(${Snow})`}

    : { backgroundImage: `url(${Image})`}
}
  >
      <form className='inputContainer'>
          <input 
          className='input'
          type="text" 
          value={inputValue}
          placeholder='Search' 
          onChange={(e)=> setInputValue(e.target.value)}  />
          <button
          className='inputBtn'
          id="searchBtn"
          onClick={handleOnChange}>Search</button><br/>
      </form>
      <div className='search-result'>
        <h1>Date : {weatherData.date}</h1>
        <h1>Name : {weatherData.name}</h1>
        <h1>Region : {weatherData.region} </h1>
        <h1>Country : {weatherData.country} </h1>
        <h1>Current : {weatherData.current} °c</h1>
        <h1> Condition : {weatherData.condition}</h1>
        <h1> High : {weatherData.high} °c</h1> 
        <h1> Low : {weatherData.low} °c</h1>  
      </div>
    </div>
    )
}

