import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import '../css/styles.scss'
import Card from './Card';
import { convertDate } from './functions';

const Home = () => {
    const [ip, setIP] = useState("")
    const [weatherList,setWeatherList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
        .then((result) => {
            setCurrentWeather({
                cityName: result.data.location.name,
                countryName: result.data.location.country,
                time: convertDate(result.data.location.localtime),
                updated: convertDate(result.data.current.last_updated),
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
    },[])

    return (
        <div className='container'>
            <Navbar weatherList={weatherList} setWeatherList={setWeatherList}/>
            <div className='currentCard'>
                <p>{currentWeather.cityName}</p>
                <p>{currentWeather.countryName}</p>
                <p>{currentWeather.time}</p>
                <p>{currentWeather.updated}</p>
                <div className='temperatures'>
                    <p>{currentWeather.F}</p>
                    <p>{currentWeather.C}</p>
                </div>
                <p>{currentWeather.condition}</p>
                <img alt='weather icon' src={currentWeather.icon}></img>
            </div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Home