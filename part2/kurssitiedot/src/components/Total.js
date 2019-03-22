import React from 'react';

const Total = ({parts}) => {
    const sum = parts.reduce( (i, n) => {
        return i +n.exercises;
    }, 0);
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}

export default Total;