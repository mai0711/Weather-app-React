import React from 'react'
import './Hourly.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'react-bootstrap';

export default function Hourly() {
    
    const [hourly, setHourly] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [hourlyArray, setHourlyArray] = useState([]);

    useEffect(()=>{
        getHourlyData();
    },[addInputValue])
    
    const getHourlyData = async ()=> {
        const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0742e1cdce82430e90531909232103&q=${inputValue}&days=1&aqi=no&alerts=no`)
        
        setHourlyArray(data.forecast.forecastday[0].hour)
        
        setHourly({
            name: data.location.country,
            country: data.location.country,
            region: data.location.region,
            date: data.forecast.forecastday[0].date,
        });
    };

    const handleOnChange = (e)=>{
        e.preventDefault()
        setAddInputValue(inputValue);
        // setInputValue(""); 
    }

    return (
        <div className='hourly'>
            <br />
            <form className='inputContainer'>
                <input
                className='input'
                type="text" 
                value={inputValue}
                placeholder='Search' 
                onChange={(e)=> setInputValue(e.target.value)}  />
                <button
                className='inputBtn'
                onClick={handleOnChange}>Search</button>
            </form>
            <div className='location'>
                <h2>date : {hourly.date}</h2>
                <h2>Region : {hourly.region} </h2>
                <h2>Country : {hourly.country} </h2>
        </div>
    <br />
        

    {hourlyArray?.map(result=>{
        return(
            <div className='hourlyContainer'>
                <div className="hourlyHeader">
                    <p>{result.time.slice(11)}</p>
                    <p></p>
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







    {/* {hourlyArray?.map(result=>{
        return(
            <div className='weeklyContainer'>
                <div className="weeklyHeader">
                    <p>{result.time.slice(11)}</p>
                    <p></p>
                    <img src={result.condition.icon}
                        alt=""
                        style={{ width: 100, height: 100, backgroundColor: '#cde4ff' }} />
                </div>
                <div className='weeklyBody'>
                    <p>Temperature : {result.temp_c} °c</p>
                    <p>Chance of rain : {result.will_it_rain} %</p>
                    <p>Precipitation : {result.precip_mm} mm</p>
                </div>
            </div>
        )
    })} */}
    </div>
    )
}
