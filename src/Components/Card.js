import React, { useEffect, useState } from 'react'
import '../css/styles.scss';
import axios from 'axios'
import { convertCondition, convertLocation, convertDate } from './functions';
import { FaDeleteLeft } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";

const Card = (props) => {

    // const [newLocalTime, setNewLocalTime] = useState("")

    const {weatherList,
        setWeatherList,
        locationName,
        locationCountry,
        locationRegion,
        localTime,
        lastUpdated,
        icon,
        condition,
        temp_f,
        temp_c,
        idx,
        fToC,
        setFToC
    } = props

    // useEffect(() => {
    //     const fetchData = async () => {
    //         axios.get(`https://api.weatherapi.com/v1/forecast.json?key=ed7bf3890ad2432497a63148232608&q=${locationName}&days=3&aqi=no&alerts=no`)
    //         .then((result) => {
    //             console.log(result)
    //             if(result.data.location.localTime !== undefined){
    //                 setNewLocalTime(result.data.location.localTime)
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     }
    //     fetchData()
    //     const intervalId = setInterval(() => {
    //         fetchData()
    //     }, 60000)
    //     return () => clearInterval(intervalId)
    // },[newLocalTime])

    const deleteHandler = (idx) =>{
        const newWeatherList = weatherList.filter((item,index) => {
            return index !== idx
        })
        setWeatherList([...newWeatherList])
        localStorage.setItem("savedWeatherList", JSON.stringify([...newWeatherList]))
    }

    return (
        <div className={`card ${convertCondition(condition)}`}>
            <FaDeleteLeft className='deleteButton' size={'2.4rem'} onClick={()=>deleteHandler(idx)}/>
            <p className='location'>{convertLocation(locationName, locationRegion, locationCountry)}</p>
            <div className='time'>
                <p className='hour'>{localTime.slice(0,localTime.length-2)}</p>
                {/* <p className='hour'>{ newLocalTime !== "" ? newLocalTime.slice(0,newLocalTime.length-2) : localTime.slice(0,localTime.length-2)}</p> */}
                <p className='meridiem'>{localTime.slice(localTime.length-2,localTime.length).toLowerCase()}</p>
            </div>
            <img src={icon} alt=""/>
            <div className='temperatures'>
                <p>{fToC ? `${temp_f}°F` : `${temp_c}°C`}</p>
            </div>
            <p className='condition'>{condition}</p>
            <div className='footer'>
                <BsGear />
                <p>Last updated: {convertDate(lastUpdated)} (local time)</p>
            </div>
        </div>
    )
}

export default Card