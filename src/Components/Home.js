import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import '../css/styles.scss';
import Card from './Card';
import { convertDate, getMoon } from './functions';
import { GrLocation } from "react-icons/gr";

const Home = () => {
    const [weatherList,setWeatherList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    const [moonOut, setMoonOut] = useState(false)

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&days=3&aqi=no&alerts=no`)
        .then((result) => {
            console.log(result.data)
            let astroData = result.data.forecast.forecastday[0].astro
            setMoonOut(getMoon(result.data.location.localtime.slice(11,16), astroData.sunset, astroData.sunrise))
            setCurrentWeather({
                cityName: result.data.location.name,
                F: result.data.current.temp_f,
                C: result.data.current.temp_c,
                time: convertDate(result.data.location.localtime),
                updated: convertDate(result.data.current.last_updated),
                condition: result.data.current.condition.text,
                icon: result.data.current.condition.icon,
                forecastList: result.data.forecast.forecastday,
            })
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getData()
        const newWeatherList = JSON.parse(localStorage.getItem("savedWeatherList"))
        if(newWeatherList){
            setWeatherList(newWeatherList)
            console.log(newWeatherList)
        }
    },[])

    const clearLocalStorage = () => {
        console.log(weatherList.length)
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className={`container ${moonOut ? "dark" : "light"}`}>
            <Navbar weatherList={weatherList} setWeatherList={setWeatherList}/>
            <div className='currentCard'>
                <div className='currentCardHeader'>
                    <h2>Your Location <GrLocation /></h2>
                    <p>{currentWeather.cityName}</p>
                    <div className='temperatures'>
                        <p>{currentWeather.F}&deg;F</p>
                        <p>{currentWeather.C}&deg;C</p>
                    </div>
                    <img alt='weather icon' src={currentWeather.icon}></img>
                    <p>{currentWeather.condition}</p>
                    <p>{currentWeather.sunOut}</p>
                </div>
                <div className='currentCardContent'>
                    <div className=''>

                    </div>
                    <div className='forecast'>

                    </div>
                </div>
                <div className='footer'>
                    <p>Local Time: {currentWeather.time}</p>
                    <p>Updated at: {currentWeather.updated}</p>
                </div>
            </div>
            <div className="clearButton">
                <button className={`${weatherList.length === 0 ? "noDisplay" : ""}`} onClick={clearLocalStorage}>Clear All</button>
            </div>
            <div className='weatherList'>
                {
                    weatherList.map((item,index) => (
                        <Card key={index}
                            idx={index}
                            weatherList={weatherList}
                            setWeatherList={setWeatherList}
                            locationName={item.data.location.name}
                            locationCountry={item.data.location.country}
                            locationRegion={item.data.location.region}
                            localTime={convertDate(item.data.location.localtime)}
                            lastUpdated={item.data.current.last_updated}
                            icon={item.data.current.condition.icon}
                            condition={item.data.current.condition.text}
                            temp_f={item.data.current.temp_f}
                            temp_c={item.data.current.temp_c}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home