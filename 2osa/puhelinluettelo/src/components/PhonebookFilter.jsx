
const PhonebookFilter = ({namesFilter, handleFilterChange}) => {

    return (
      <div>
          <h2>Numbers</h2>
          <div>
            filter:
            <input name="filterInput" value={namesFilter} onChange={handleFilterChange}>
            </input>
          </div>
        </div>
    )
}



export default PhonebookFilter