const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
}

const Content = (props) => {
  return (
    <>
      {props.topics.map((topic) => (
        <>
          <p>{topic.name} {topic.exercises}</p>
        </>
      ))}
    </>
  );
}

const Total = (props) => {
  let sum = 0;
  props.total.forEach(topic => sum += topic.exercises);
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const topics = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course = {course}/>
      <Content topics={topics}/>
      <Total total={topics}/>
    </div>
  )
}   

export default App
