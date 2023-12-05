import React from 'react'
import axios from 'axios'
import '../css/styles.scss';
import { checkWeatherList } from './functions';

const Navbar = (props) => {

    const {weatherList, setWeatherList} = props

    const searchHandler = (e) => {
        e.preventDefault()
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${e.target[0].value}&aqi=yes`)
        .then((result) => {
            console.log(result)
            if(checkWeatherList(result.data.location.name, weatherList)){
                console.log("Already in list")
            }else{                
                setWeatherList([...weatherList,result])
                localStorage.setItem("savedWeatherList", JSON.stringify([...weatherList,result]))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className='navbar'>
            <form className="searchBar" onSubmit={searchHandler}>
                <label htmlFor="">Search Weather:</label>
                <input type="text" placeholder='Search city name, US Zipcode, UK Postcode, IP address'/>
                <button className='searchButton'>Search</button>
            </form>
        </div>
    )
}

export default Navbar