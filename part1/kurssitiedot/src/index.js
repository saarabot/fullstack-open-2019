import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    );
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
}
const Content = (props) => {
    return (
        props.content.map(c => {
            return <Part key={c.name} name={c.name} exercises={c.exercises}/>
        })
    );
}

const Total = (props) => {
    const sum = props.parts.reduce(function(i, n) {
        return i +n.exercises;
    }, 0);
    return (
        <p>yhteensä {sum} tehtävää</p>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {'name': 'Reactin perusteet', 'exercises': 10},
            {'name': 'Tiedonvälitys propseilla', 'exercises': 7},
            {'name': 'Komponenttien tila', 'exercises': 14}
        ],
    };
    

    return (
        <div>
            <Header course={course.name} />
            <Content content={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));


