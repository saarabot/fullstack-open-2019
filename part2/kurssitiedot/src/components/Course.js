import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({course}) => {
    return (
        <>
        <Header course={course.name} />
        <Content content={course.parts} />
        </>
    );
}

export default Course;