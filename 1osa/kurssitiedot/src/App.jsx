const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  ]

  return (
    <div>
      <Header name = {course}></Header>
      <Content parts = {parts}></Content>
      <Total parts = {parts}></Total>
    </div>
  )
}

const Header = (props) => {
  console.log('header', props)
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  console.log('Content', props)
  return (
    <div>
      <Part part = {props.parts[0]}>
      </Part>
      <Part part = {props.parts[1]}>
      </Part>
      <Part part = {props.parts[2]}>
      </Part>
    </div>
  )
}

const Part = (props) => {
  console.log('Part', props)
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  console.log('Total', props)
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}

export default App