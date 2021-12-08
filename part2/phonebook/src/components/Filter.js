
const Filter = (props) => {
    const {filterSearch, handleFilterSearch } = props

    return (
        <div>
            filter shown with <input  value={filterSearch} onChange={handleFilterSearch} />
        </div>
    )
}

export default Filter