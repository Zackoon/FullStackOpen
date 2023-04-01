
const Header = ({ header, Htype }) => <Htype>{header}</Htype>;

const Content = (props) => {
  console.log(props)
  return (
    <>
    {props.parts.map(part => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>)
    )}
    </>
  );
}

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} Htype='h1'/>
      <Content parts={course.parts} />
    </>
  )
};

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;