import React from 'react';

const Filter = ({filter, handleFilterChange}) => {
    return(
        <div >
            Rajaa näytettäviä
            <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter;