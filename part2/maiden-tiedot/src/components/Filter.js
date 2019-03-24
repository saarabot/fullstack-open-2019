import React from 'react';

const Filter = ({filter, handleFilterChange, clearSearch}) => {
    return(
        <>
        Find countries: <input value={filter} onChange={handleFilterChange} />
        <button onClick={() => clearSearch()}>Clear</button>
        </>
    );
}

export default Filter;