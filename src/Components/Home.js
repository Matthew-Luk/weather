import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import '../css/styles.scss'
import Card from './Card';

const Home = () => {
    const [ip, setIP] = useState("")
    const [weatherList,setWeatherList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
        .then((result) => {
            console.log(result.data)
            setCurrentWeather({
                cityName: result.data.location.name,
                F: result.data.current.temp_f,
                C: result.data.current.temp_c,
                condition: result.data.current.condition.text,
                icon: result.data.current.condition.icon
            })
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getData()
        console.log(ip)
    },[])

    return (
        <div className='container'>
            <Navbar weatherList={weatherList} setWeatherList={setWeatherList}/>
            <div className='currentCard'>
                <h1>{currentWeather.cityName}</h1>
                <div className='temperatures'>
                    <h1>{currentWeather.F}</h1>
                    <h1>{currentWeather.C}</h1>
                </div>
                <h1>{currentWeather.condition}</h1>
                <img alt='weather icon' src={currentWeather.icon}></img>
            </div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Home