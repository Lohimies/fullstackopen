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
      <Stat name='good' count={goodCount} ></Stat>
      <Stat name='neutral' count={neutralCount}></Stat>
      <Stat name='bad' count={badCount}></Stat>
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


export default App
