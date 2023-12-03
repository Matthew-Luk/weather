import React from 'react'
import '../css/styles.scss';
import { convertCondition } from './functions';
import { FaDeleteLeft } from "react-icons/fa6";

const Card = (props) => {

    const {weatherList,
        setWeatherList,
        nameList,
        setNameList,
        locationName,
        locationCountry,
        localTime,
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
        const newNameList = nameList.filter((item,index) => {
            return index !== idx
        })
        setNameList([...newNameList])
    }

    return (
        <div className={`card ${convertCondition(condition)}`}>
            <FaDeleteLeft className='deleteButton' size={'2.4rem'} onClick={()=>deleteHandler(idx)}/>
            <div>
                <p>{localTime}</p>
                <img src={icon} alt=""/>
                <p>{condition}</p>
            </div>
            <div>
                <p>{temp_f}&deg;F</p>
                <p>{temp_c}&deg;C</p>
            </div>
            <p>{locationName}, {locationCountry}</p>
        </div>
    )
}

export default Card