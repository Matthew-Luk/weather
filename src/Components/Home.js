import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';
import '../css/styles.scss';
import Card from './Card';
import { convertDate, getMoon, convertDayOfTheWeek, updateWeatherList } from './functions';
import { GrLocation } from "react-icons/gr";

const Home = () => {
    const [weatherList,setWeatherList] = useState([])
    const [currentWeather, setCurrentWeather] = useState({})
    const [moonOut, setMoonOut] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [forecastList, setForecastList] = useState([])

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&days=3&aqi=no&alerts=no`)
        .then((result) => {
            // console.log(result.data)
            let astroData = result.data.forecast.forecastday[0].astro
            setForecastList(result.data.forecast.forecastday)
            setMoonOut(getMoon(result.data.location.localtime.slice(11,16), astroData.sunset, astroData.sunrise))
            setCurrentWeather({
                cityName: result.data.location.name,
                F: result.data.current.temp_f,
                C: result.data.current.temp_c,
                time: convertDate(result.data.location.localtime),
                updated: convertDate(result.data.current.last_updated),
                condition: result.data.current.condition.text,
                icon: result.data.current.condition.icon,
                wind: result.data.current.wind_mph,
                precip: result.data.current.precip_in,
                pressure: result.data.current.pressure_in,
                humidity: result.data.current.humidity
            })
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getData()
        const temp = JSON.parse(localStorage.getItem("savedWeatherList"))
        setWeatherList([])
        if(temp){
            // setWeatherList(temp)
            let x = updateWeatherList(temp)
            axios.all(x.map((value) => axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${value}&aqi=yes`)))
            .then((result) => {
                console.log(result)
                setWeatherList(result)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },[])

    const clearLocalStorage = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className={`container ${moonOut ? "dark" : "light"}`}>
            <Navbar weatherList={weatherList} setWeatherList={setWeatherList} searchValue={searchValue} setSearchValue={setSearchValue}/>
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
                    <div className='forecast'>
                        {
                            forecastList.map((item,index) => (
                                <div className='forecastItem' key={index}>
                                    <p>{convertDayOfTheWeek(item.date_epoch)}</p>
                                    <img src={item.day.condition.icon} alt="" />
                                    <p>{item.day.avgtemp_f}&deg;F / {item.day.avgtemp_c}&deg;C</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='currentWeatherConditions'>
                        <p>Weather Conditions:</p>
                        <p>Wind: {currentWeather.wind} mph</p>
                        <p>Precipitation: {currentWeather.precip} in</p>
                        <p>Pressure: {currentWeather.pressure} in</p>
                        <p>Humidity: {currentWeather.humidity}%</p>
                    </div>
                </div>
                <div className='footer'>
                    <p>Last updated: {currentWeather.updated}</p>
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