const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => <Course course={course} key={course.id}></Course>)}
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
  const exercisesArray = course.parts.map((part) => part.exercises)
  console.log('Total', exercisesArray)
  return (
    <b>Total number of exercises: {exercisesArray.reduce((sum, currentVal) => sum + currentVal)}</b>
  )
}

export default App