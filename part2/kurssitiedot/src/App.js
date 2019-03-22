import React from 'react';
import Course from './components/Course';

const App = () => {
    const courses = [
    {
        name: 'Half Stack -sovelluskehitys',
        id: 1,
        parts: [
            { id: 1, name: 'Reactin perusteet', exercises: 10},
            { id: 2, name: 'Tiedonvälitys propseilla', exercises: 7},
            {id: 3, name: 'Komponenttien tila', exercises: 14}
        ],
    },
    {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewaret',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

    return (
        <div>
            <h1>Opetusohjelma</h1>
            {courses.map(course => {
                return <Course key={course.id} course={course} />
            })}
        </div>
    );
}

export default App;