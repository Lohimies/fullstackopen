import { useState } from 'react'


const App = () => {
  const [goodCount, setGoodCount] = useState(0)
  const [neutralCount, setNCount] = useState(0)
  const [badCount, setBCount] = useState(0)

  const handleGoodClick = () => {
    setGoodCount(goodCount+1)
  }

  const handleBadClick = () => {
    setBCount(badCount + 1)
  }

  const handleNeutralClick = () => {
    setNCount(neutralCount + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={'good'} onClick={handleGoodClick}></Button>
      <Button text={'neutral'} onClick={handleNeutralClick}></Button>
      <Button text={'bad'} onClick={handleBadClick}></Button>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></Statistics>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({goodCount, neutralCount, badCount}) => {

    const sum = goodCount + neutralCount + badCount
    const average = (goodCount - badCount)/(goodCount + neutralCount + badCount)
    const percentage = goodCount/(goodCount + neutralCount + badCount)

  if ((goodCount+neutralCount+badCount) === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>No feedback given.</p>
      </div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={'Good reviews:'} value={goodCount}></StatisticLine>
          <StatisticLine text={'Neutral reviews:'} value={neutralCount}></StatisticLine>
          <StatisticLine text={'Bad reviews:'} value={badCount}></StatisticLine>
          <StatisticLine text={'Sum of all reviews:'} value={sum}></StatisticLine>
          <StatisticLine text={'Average of reviews:'} value={average}></StatisticLine>
          <StatisticLine text={'Percentage of positive reviews:'} value={percentage}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


export default App
