import { useState } from 'react'

const Statistics = (props) =>{
  const {good, neutral, bad, all, average, percentage} = props
  return(
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {percentage} %</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)
  
  const setGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
    setAverage((updatedGood - bad)/(updatedGood + neutral + bad))
    setPercentage(updatedGood/(updatedGood + neutral + bad)*100)
  }
  const setNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(good + updatedNeutral + bad)
    setAverage((good - bad)/(good + updatedNeutral + bad))
    setPercentage(good/(good + updatedNeutral + bad)*100)
  }
  const setBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(good + neutral + updatedBad)
    setAverage((good - updatedBad)/(good + neutral + updatedBad))
    setPercentage((good/(good + neutral + updatedBad))*100)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={setGoodClick}>good</button>
      <button onClick={setNeutralClick}>neutral</button>
      <button onClick={setBadClick}>bad</button>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} percentage = {percentage} />
    </div>
  )
}

export default App