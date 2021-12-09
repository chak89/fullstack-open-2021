
const Countries = ({showResult}) => {

    if(showResult.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } 
    else if(showResult.length === 1) {

        const languages = Object.values(showResult[0].languages).map((v,index) => <li key={index}>{v}</li>)
        const flagUrl = showResult[0].flags.png

        return (
            <>
            <div>
                <h1>{showResult[0].name.common}</h1>
                <div>capital {showResult[0].capital}</div>
                <div>population {showResult[0].population}</div>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                {languages}
                </ul>
            </div>
            <div>
                <img src={flagUrl} alt="flag logo"/>
            </div>
            </>
        )
    } 
    else {
        const displayCountries = showResult.map((country, index) => <div key={index}>{country.name.common}</div>)

        return (
           <div>
               {displayCountries}
           </div>
        )
    }

}

export default Countries