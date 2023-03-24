import React from 'react'
import './Hourly.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Hourly() {
    const [hourly, setHourly] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [hourlyArray, setHourlyArray] = useState([]);
    const [date, setDate] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");

    useEffect(()=>{
        getHourlyData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const getHourlyData = async ()=> {
        const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0742e1cdce82430e90531909232103&q=${inputValue}&days=1&aqi=no&alerts=no`)
        setHourlyArray(data.forecast.forecastday[0].hour)
        setDate("Date :")
        setRegion("Region :")
        setCountry("Country :")
        setHourly({
            name: data.location.country,
            country: data.location.country,
            region: data.location.region,
            date: data.forecast.forecastday[0].date,
        });

        setInputValue("")
    };


    return (
        <div className='hourly'>
            <h1>Hourly Forecast</h1>
            <div className='hourlyInputContainer'>
                <input
                className='input'
                type="text" 
                value={inputValue}
                placeholder='Search for location' 
                onChange={(e)=> setInputValue(e.target.value)} />
                <button
                className='inputBtn'
                onClick={getHourlyData}>Search</button>
            </div>
            <div className='location'>
                <h2>{date}{hourly.date}</h2>
                <h2>{region}{hourly.region}</h2>
                <h2>{country}{hourly.country}</h2>
            </div>
        <br />
        
    {hourlyArray?.map(result=>{
        return(
            <div className='hourlyContainer'>
                <div className="hourlyHeader">
                    <p>{result.time.slice(11)}</p>
                    <img src={result.condition.icon}
                        alt=""
                        style={{ width: 70, height: 70, backgroundColor: '#cde4ff' }} />
                </div>
                <div className='hourlyBody'>
                    <h5>Temperature<br /></h5>
                    <p>{result.temp_c} °c</p>
                    <h5>Chance of rain<br /></h5>
                    <p>{result.will_it_rain} %</p>
                    <h5>Precipitation<br /></h5>
                    <p>{result.precip_mm} mm</p>
                </div>
            </div>
        )
    })}
    </div>
    )
}
