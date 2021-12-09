
const Search = (props) => {
    const {handleSearch} = props

    return (
        <div>
            find countries: <input onChange={handleSearch} />
        </div>
    ) 
}

export default Search