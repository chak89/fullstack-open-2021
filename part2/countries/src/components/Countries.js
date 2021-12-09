import React, { useEffect, useState } from "react";
import CountryView from "./CountryView"



const Countries = ({ showResult }) => {

    const [countryIndex, setCountryIndex] = useState('')
    const [showCountry, setShowCountry] = useState(false)
    const [renderedShowCountry, setRenderedShowCountry] = useState(null)
    const [buttonShowText, setButtontext] = useState('show')

    const handleButton = (index) => {
        setCountryIndex(index)
        setShowCountry(!showCountry)

        if(buttonShowText==='show') {
            setButtontext('unshow')
        } else {
            setButtontext('show')
        }
    }

    useEffect(() => {
        setRenderedShowCountry(showCountry ? <CountryView showResult={showResult[countryIndex]} /> : null) 
    }, [countryIndex, showCountry, showResult]);

    if (showResult.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (showResult.length === 1) {
        return (
            <CountryView showResult={showResult[0]} />
        )
    }
    else {
        const displayCountries = showResult.map((country, index) => (
            <div key={index}>
                {country.name.common}
                <button onClick={() => handleButton(index)}>{buttonShowText}</button>
                {index === countryIndex ? renderedShowCountry : null}
            </div>))

        return (
            <div>
                {displayCountries}
            </div>
        )
    }

}


export default Countries