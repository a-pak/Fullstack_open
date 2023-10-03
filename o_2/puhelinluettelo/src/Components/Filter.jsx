import React from 'react'

const Filter = ({ handleFilterChange, filter }) => {

    return (
        <>
        <div>Filter shown with <input value={filter} onChange={handleFilterChange} /></div>
        </>
    )
}

export default Filter