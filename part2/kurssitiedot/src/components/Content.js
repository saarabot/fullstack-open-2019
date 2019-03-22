import React from 'react';
import Part from './Part';
import Total from './Total';

const Content = ({content}) => {
    return (
        <>
        {content.map(c => {
            return <Part key={c.name} name={c.name} exercises={c.exercises}/>
        })}
        <Total parts={content} />
        </>
    );
}

export default Content;