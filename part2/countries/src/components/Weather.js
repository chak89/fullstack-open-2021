import axios from "axios"
import { useEffect, useState } from "react"

const Weather = ({showResult}) => {

    const [result, setResult] = useState(null)
    /* 11f21fbea3bad652730b1edd97296210 */


    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${showResult.capital}&units=metric&appid=${api_key}`
        axios.get(api_url)
        .then(response => setResult(response.data))
      }, [])

    console.log('result', result)

    if (result) {
        return (
            <>
            <div><b>temperature: {result.main.temp} ℃</b></div>
            <div></div>
            <div><b>wind:</b> {result.wind.speed}m/s - direction {result.wind.deg} degrees</div>
            </>
        )
    }
    else {
        return (

            null
        )
    }

}

export default Weather