import React from 'react'
import axios from 'axios'
import '../css/styles.scss';

const Navbar = (props) => {

    const {weatherList, setWeatherList, nameList, setNameList} = props

    const searchHandler = (e) => {
        e.preventDefault()
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${e.target[0].value}&aqi=yes`)
        .then((result) => {
            console.log(result)
            if(nameList.includes(result.data.location.name)){
                console.log("Already in list")
            }else{                
                setNameList([...nameList,result.data.location.name])
                setWeatherList([...weatherList,result])
                localStorage.setItem("savedWeatherList", JSON.stringify([...weatherList,result]))
                // localStorage.setItem("savedNames", JSON.stringify([...nameList,result.data.location.name]))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const clearLocalStorage = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div className='navbar'>
            <form className="searchBar" onSubmit={searchHandler}>
                <label htmlFor="">Search Weather:</label>
                <input type="text" placeholder='Search city name, US Zipcode, UK Postcode, IP address'/>
                <button className='searchButton'>Search</button>
                <button onClick={clearLocalStorage}>Clear</button>
            </form>
        </div>
    )
}

export default Navbar