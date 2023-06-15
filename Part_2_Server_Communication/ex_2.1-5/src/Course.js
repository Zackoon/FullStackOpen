
const Header = ({ header, Htype }) => <Htype>{header}</Htype>;

const Total = (props) => {
  const exerciseCounts = props.parts.map(part => part.exercises)
  const total = exerciseCounts.reduce((a, b) => a + b, 0)
  return <strong>total of {total} exercises</strong>
};

const Content = (props) => {
  return (
    <>
    {props.parts.map(part => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>)
    )}
    <Total parts={props.parts} />
    </>
  )
};

const Course = ({ course }) => {
  return (
    <>
      <Header header={course.name} Htype='h1'/>
      <Content parts={course.parts} />
    </>
  )
};

export default Course;