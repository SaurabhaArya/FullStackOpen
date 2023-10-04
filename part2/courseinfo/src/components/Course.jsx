import React from "react";

const Course = ({courses}) => {
    const Header = ({header}) => {
      return (
        <h2>{header}</h2>
      );
    }

    const Content = ({parts}) => {
      return (
        <>
            {parts.map(part => (
                <Part key={part.id} part={part} />
            ))}
        </>
      );
    }

    const Part = ({part}) => {
      return (
        <p>
          {part.name} {part.exercises}
        </p>
      );
    }

    const Total = ({parts}) => {
      return (
        <strong>Total of {parts.reduce((acc, curr) => acc + curr.exercises, 0)} exercises</strong>
      );
    }

    return (
        <>
            <h1>Web Development Curriculum</h1>
            {courses.map(course => (
                <React.Fragment key={course.id}>
                    <Header header={course.name}/>
                    <Content parts={course.parts}/>
                    <Total parts={course.parts} />
                </React.Fragment>
            ))}
        </>
    )
}

export default Course