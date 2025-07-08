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
      <h2>statistics</h2>
      <Stat name='good:' count={goodCount} ></Stat>
      <Stat name='neutral:' count={neutralCount}></Stat>
      <Stat name='bad:' count={badCount}></Stat>
      <SumStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></SumStat>
      <AverageStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></AverageStat>
      <PositivesStat goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}></PositivesStat>
    </div>
  )
}

const Stat = ({name, count}) => {
  return (
    <div>
      {name} {count}
    </div>
  )
}

const SumStat = ({goodCount, neutralCount, badCount}) => {
  const sum = goodCount + neutralCount + badCount
  return (
    <div>
      sum of all: {sum}
    </div>
  )
}

const AverageStat = ({goodCount, neutralCount, badCount}) => {
  const average = (goodCount + neutralCount + badCount)/3
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

const Sum = ({int1, int2, int3}) => {int1+int2+int3}

const Average = ({int1, int2, int3}) => {(int1+int2+int3)/3}

const Positive = ({pos, neut, neg}) => {pos/(pos+neut+neg)}


export default App
