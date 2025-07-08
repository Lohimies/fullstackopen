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
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></Statistics>
    </div>
  )
}

const Statistics = ({goodCount, neutralCount, badCount}) => {

  const SumStat = ({goodCount, neutralCount, badCount}) => {
    const sum = goodCount + neutralCount + badCount
    return (
      <div>
        sum of all: {sum}
      </div>
    )
  }

  const AverageStat = ({goodCount, neutralCount, badCount}) => {
    const average = (goodCount - badCount)/(goodCount + neutralCount + badCount)
    return (
      <div>
        average of scores: {average}
      </div>
    )
  }

  const PositivesStat = ({goodCount, neutralCount, badCount}) => {
    const percentage = goodCount/(goodCount + neutralCount + badCount)
    return (
      <div>
        percentage of positives: {percentage}
      </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <div>good: {goodCount}</div>
      <div>neutral: {neutralCount}</div>
      <div>bad: {badCount}</div>
      <SumStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></SumStat>
      <AverageStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></AverageStat>
      <PositivesStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></PositivesStat>
    </div>
  )
}




export default App
