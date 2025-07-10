const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
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

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header courseName={course.name}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  )
}

const Header = ({courseName}) => {
  console.log('header', courseName)
  return (
    <h1>{courseName}</h1>
  )
}

const Content = ({course}) => {
  console.log('Content', course)
  return (
    <div>
      {course.parts.map((part) => <p key={part.id}>{part.name}: {part.exercises}</p>)}
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

const Total = ({course}) => {
  console.log('Total', course)
  return (
    <p>Total number of exercises: {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
  )
}

export default App