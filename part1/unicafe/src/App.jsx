import { useState } from 'react'

const Statistics = (props) =>{
  const {good, neutral, bad, all, average, percentage} = props
  if (all === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h1>statistics</h1>
      <StatisticLine text = "good" value = {good} />
      <StatisticLine text = "neutral" value = {neutral} />
      <StatisticLine text = "bad" value = {bad} />
      <StatisticLine text = "all" value = {all} />
      <StatisticLine text = "average" value = {average} />
      <StatisticLine text = "percentage" value = {percentage} />
    </div>
  )
}

const StatisticLine = (props) => <div>{props.text} {props.value}</div>

const Button = (props) =>{
  return(
    <div>
        <button onClick={props.setGoodClick}>
          {props.goodText}
        </button>
        <button onClick={props.setNeutralClick}>
          {props.neutralText}
        </button>
        <button onClick={props.setBadClick}>
          {props.badText}
        </button>
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
      <Button setGoodClick = {setGoodClick} goodText = "good" 
              setNeutralClick = {setNeutralClick} neutralText = "neutral"
              setBadClick = {setBadClick} badText = "bad"
      />
     
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all} average = {average} percentage = {percentage} />
    </div>
  )
}

export default App