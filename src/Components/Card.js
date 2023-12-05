import React from 'react'
import '../css/styles.scss';
import { convertCondition, convertLocation, convertDate } from './functions';
import { FaDeleteLeft } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";

const Card = (props) => {

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
        idx} = props

    const deleteHandler = (idx) =>{
        const newWeatherList = weatherList.filter((item,index) => {
            return index !== idx
        })
        setWeatherList([...newWeatherList])
    }

    return (
        <div className={`card ${convertCondition(condition)}`}>
            <FaDeleteLeft className='deleteButton' size={'2.4rem'} onClick={()=>deleteHandler(idx)}/>
            <p className='location'>{convertLocation(locationName, locationRegion, locationCountry)}</p>
            <div className='time'>
                <p className='hour'>{localTime.slice(0,localTime.length-2)}</p>
                <p className='meridiem'>{localTime.slice(localTime.length-2,localTime.length).toLowerCase()}</p>
            </div>
            <img src={icon} alt=""/>
            <div className='temperatures'>
                <p>{temp_f}&deg;F</p>
                <p>/</p>
                <p>{temp_c}&deg;C</p>
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