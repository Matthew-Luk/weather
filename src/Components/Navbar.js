import React from 'react'
import axios from 'axios'

const Navbar = () => {

    const searchHandler = (e) => {
        console.log(e.target[0].value)
        e.preventDefault()
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${e.target[0].value}&aqi=yes`)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <div>
                <form onSubmit={searchHandler}>
                    <label htmlFor=""></label>
                    <input type="text" placeholder='Search city name, US Zipcode, UK Postcode, IP address'/>
                    <button>Search</button>
                </form>
            </div>
        </div>
    )
}

export default Navbar