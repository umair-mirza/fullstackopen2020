import React from 'react'

const SearchBox = ({searchField, handleSearch}) => {
    return (
        <>
            search contact: <input value={searchField} onChange={handleSearch} />
        </>
    )
}

export default SearchBox