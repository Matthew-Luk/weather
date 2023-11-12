import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import '../css/styles.scss'
import Card from './Card';
import { convertDate, getSun } from './functions';

const Home = () => {
    const [ip, setIP] = useState("")
    const [weatherList,setWeatherList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    const [sunOut, setSunOut] = useState("")

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
        // axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
        // axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&days=3&aqi=no&alerts=no`)
        .then((result) => {
            // console.log(result.data.forecast.forecastday[0].astro.is_sun_up)
            setCurrentWeather({
                cityName: result.data.location.name,
                F: result.data.current.temp_f,
                C: result.data.current.temp_c,
                time: convertDate(result.data.location.localtime),
                updated: convertDate(result.data.current.last_updated),
                condition: result.data.current.condition.text,
                icon: result.data.current.condition.icon,
                forecastList: result.data.forecast.forecastday,
                sunOut: getSun(result.data.forecast.forecastday[0].astro.is_sun_up)
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
        <div className='container' style={{}}>
            <Navbar weatherList={weatherList} setWeatherList={setWeatherList}/>
            <div className='currentCard'>
                <div className='currentCardHeader'>
                    <h2>Your Location (based on IP address)</h2>
                    <p>{currentWeather.cityName}</p>
                    <div className='temperatures'>
                        <p>{currentWeather.F}&deg;F</p>
                        <p>{currentWeather.C}&deg;C</p>
                    </div>
                    <img alt='weather icon' src={currentWeather.icon}></img>
                    <p>{currentWeather.condition}</p>
                    <p>Local Time: {currentWeather.time}</p>
                    <p>Updated at: {currentWeather.updated}</p>
                    <p>{currentWeather.sunOut}</p>
                </div>
                <div className='currentCardContent'>
                    <div className=''>

                    </div>
                    <div className='forecast'>

                    </div>
                </div>
            </div>
            <div>
                <Card />
            </div>
        </div>
    )
}

export default Home