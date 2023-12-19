import React from 'react'
import axios from 'axios'
import '../css/styles.scss';
import { checkWeatherList } from './functions';

const Navbar = (props) => {

    const {weatherList, setWeatherList, searchValue, setSearchValue, fToC, setFToC} = props

    const searchHandler = (e) => {
        e.preventDefault()
        axios.get(`https://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${e.target[0].value}&aqi=yes`)
        .then((result) => {
            console.log(result)
            if(checkWeatherList(result.data.location.name, weatherList)){
                console.log("Already in list")
            }else{                
                setWeatherList([...weatherList,result])
                localStorage.setItem("savedWeatherList", JSON.stringify([...weatherList,result]))
            }
            setSearchValue("")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchValueHandler = (e) => {
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    const changeMeridium = (e) => {
        e.preventDefault()
        if(fToC === 1){
            setFToC(0)
        }else{
            setFToC(1)
        }
        console.log(fToC)
    }

    return (
        <div className='navbar'>
            <form className="searchBar" onSubmit={searchHandler}>
                <label htmlFor="">Search Weather:</label>
                <input onChange={searchValueHandler} value={searchValue} type="text" placeholder='Search city name, US Zipcode, UK Postcode, IP address'/>
                <button className='searchButton'>Search</button>
                <button onClick={changeMeridium}>{fToC === 1 ? "Change to C" : "Change to F"}</button>
            </form>
        </div>
    )
}

export default Navbar