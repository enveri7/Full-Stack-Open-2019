import React from 'react'

const Header = props =>
    <h1>{props.course}</h1>

const Total = ({parts}) => {
    const total = parts.reduce((acc,obj) => {
        return acc + obj.exercises
    }, 0)
    return <p>yhteensä {total} tehtävää</p>
}

const Part = ({name, exercises}) =>
    <p>{name} {exercises}</p>

const Content = ({parts}) => (
    <div>
        {parts.map(part => <Part name={part.name} key={part.id} exercises={part.exercises} />)}
        <Total parts={parts}/>
    </div>
)

const Course = ({course}) => {
    return(
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
    </div>
    )
}

export default Course