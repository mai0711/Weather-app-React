import React from 'react'
import "./WeeklyWeather.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import {Container} from 'react-bootstrap';

export default function WeeklyWeather() {
  const [weeklyWeather, setWeeklyWeather] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [addInputValue, setAddInputValue] = useState("");
  const [arrayData, setArrayData] = useState([]);
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  useEffect(()=>{
    getWeeklyWeatherData();
},[addInputValue])

  const getWeeklyWeatherData = async ()=> {
    const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0742e1cdce82430e90531909232103&q=${inputValue}&days=7&aqi=no&alerts=no`)
    setArrayData(data.forecast.forecastday)
    setRegion("Region :")
    setCountry("Country :")
    setWeeklyWeather({
    name: data.location.country,
    country: data.location.country,
    region: data.location.region,
  });
}

  const handleOnChange = (e)=>{
    e.preventDefault()
    setAddInputValue(inputValue);
    // setInputValue(""); 
  }

  return (
    <div className='weeklyWeather'>
      <h1>7 Days Forecast</h1>
      <form className='weeklyInputContainer'>
          <input
          className='input'
          type="text" 
          value={inputValue}
          placeholder='Search for location' 
          onChange={(e)=> setInputValue(e.target.value)} />
          <button
          className='inputBtn'
          onClick={handleOnChange}>Search</button><br/>
      </form>
      <div className='location'>
        <h2>{region}{weeklyWeather.region}</h2>
        <h2>{country}{weeklyWeather.country}</h2>
      </div>

        {arrayData?.map(result=>{
          return(
            <div className="group">
              <Container className='cardContainer'>
                <Card className='card'> 
                  <Card.Title className='date'>{result.date}</Card.Title>
                  <Card.Img className="img" variant="top"
                  src={result.day.condition.icon}
                  style={{ width: 100, height: 100, backgroundColor: 'lightblue' }} />
                  <Card.Body>
                    <Card.Text className='text'><p>{result.day.condition.text}</p></Card.Text>
                    <Card.Text className='text'><p>High : {result.day.maxtemp_c} °c</p></Card.Text>
                    <Card.Text className='text'><p>Low : {result.day.mintemp_c} °c</p></Card.Text>
                    <Card.Text className='text'><p>Chance of rain : {result.day.daily_chance_of_rain} %</p></Card.Text>
                  </Card.Body>
                  </Card>
                </Container>
            </div>
          )
      })}
    </div>
  )
}
