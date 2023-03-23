import React from 'react'
import "./Current.css"
import { useEffect, useState } from 'react';
import axios from 'axios'
import Sunny from "../../assets/sunny.jpg"
import Cloudy from "../../assets/cloud.jpg"
import Rainy from "../../assets/rain.jpg"
import Snow from "../../assets/snow.jpg"
import Image from "../../assets/image.jpg"
import Thunder from "../../assets/thunder.jpg"
import Fog from "../../assets/fog.jpg"

export default function Current() {
    const [weatherData, setWeatherData] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [current, setCurrent] = useState("");
    const [condition, setCondition] = useState("");
    const [high, setHigh] = useState("");
    const [low, setLow] = useState("");
    const [celsius, setCelsius] = useState("")

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

        setDate("Date : ")
        setLocation("Location : ")
        setRegion("Region : ")
        setCountry("Country : ")
        setCurrent("Current : ")
        setCondition("Condition : ")
        setHigh("High : ")
        setLow("Low : ")
        setCelsius("℃")
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

    : weatherData.condition?.toLowerCase().includes("fog")
    ? { backgroundImage: `url(${Fog})`}

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
          placeholder='Search for location' 
          onChange={(e)=> setInputValue(e.target.value)}  />
          <button
          className='inputBtn'
          id="searchBtn"
          onClick={handleOnChange}>Search</button><br/>
      </form>
      <div className='search-result'>
        <h1>{date}{weatherData.date}</h1>
        <h1>{location}{weatherData.name}</h1>
        <h1>{region}{weatherData.region} </h1>
        <h1>{country}{weatherData.country} </h1>
        <h1>{current}{weatherData.current}{celsius}</h1>
        <h1>{condition}{weatherData.condition}</h1>
        <h1>{high}{weatherData.high}{celsius}</h1> 
        <h1>{low}{weatherData.low}{celsius}</h1>  
      </div>
    </div>
    )
}

