
const CountryView = ({showResult}) => {
    console.log("CountryView", showResult)

    const languages = Object.values(showResult.languages).map((v, index) => <li key={index}>{v}</li>)
    const flagUrl = showResult.flags.png

    return (
        <>
            <div>
                <h1>{showResult.name.common}</h1>
                <div>capital {showResult.capital}</div>
                <div>population {showResult.population}</div>
            </div>
            <div>
                <h2>languages</h2>
                <ul>
                    {languages}
                </ul>
            </div>
            <div>
                <img src={flagUrl} alt="flag logo" />
            </div>
        </>
    )
}

export default CountryView