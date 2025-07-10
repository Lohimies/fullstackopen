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

const Total = ({course}) => {
  const exercisesArray = course.parts.map((part) => part.exercises)
  console.log('Total', exercisesArray)
  return (
    <b>Total number of exercises: {exercisesArray.reduce((sum, currentVal) => sum + currentVal)}</b>
  )
}

export default Course