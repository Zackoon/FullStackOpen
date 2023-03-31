const Hello = (props) => {
  return (
    <>
      <p>Hello {props.name}</p>
    </>
  )
}

const App = () => {
  console.log('Hello from component')
  return (
  <>
    <h1>Hello Greetings</h1>
    <Hello name='Zack'/>
    <Hello name='Alex'/>
  </>
  )
}

export default App;
