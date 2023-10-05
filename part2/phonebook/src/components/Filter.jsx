const Filter = ({str, handleSearch}) => {
    return (
      <>
        <label htmlFor="searchPerson">Filter shown with</label>
          <input 
            type="search" 
            id="searchPerson" 
            value={str}
            onChange={handleSearch}
          />
      </>
    )
}

export default Filter