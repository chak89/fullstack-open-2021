import React from 'react';

const Courses = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    )
}

const Header = ({course}) => {
    console.log(course)
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({ course }) => {
    const parts = course.parts.map(part => <Part key={part.id} part={part} />)

    return (
        <div>
            {parts}
        </div>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = ({ course }) => {
    const total = course.parts.reduce((acc, current) => {
        return acc + current.exercises
    }, 0)

    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

export default Courses