import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from './Navbar';

const Home = () => {
    const [ip, setIP] = useState("")

    const getData = async () => {
        const res = await axios.get("https://api.ipify.org/?format=json");
        setIP(res.data.ip);
        axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getData()
        console.log(ip)
    },[])

    // useEffect(() => {
    //     const getData = async () => {
    //         const res = await axios.get("https://api.ipify.org/?format=json");
    //         setIP(res.data.ip);
    //         axios.get(`http://api.weatherapi.com/v1/current.json?key=ed7bf3890ad2432497a63148232608&q=${res.data.ip}&aqi=yes`)
    //         .then((result) => {
    //             console.log(result)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    //     };
    //     getData()
    //     console.log(ip)
    // },[])

    return (
        <div>
            <Navbar/>
            <h1>Your IP address is: {ip}</h1>
            <h1></h1>
        </div>
    )
}

export default Home