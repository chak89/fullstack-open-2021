import React, { useState } from 'react'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
       {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {


  let all = good + neutral + bad
  let average = (good*1 + neutral*0 + bad*-1) / all
  let positive = (good/all)*100

  if(isNaN(average)) {
    average = 0;
  }

  if(isNaN(positive)) {
    positive = 0;
  }

  return (
    <>
    <tr>good {good}</tr>
    <tr>neutral {neutral}</tr>
    <tr>bad {bad}</tr>
    <tr>all {all}</tr>
    <tr>average {average}</tr>
    <tr>positive {positive} %</tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        onClick={increaseGood}
        text='good'
      />
      <Button
        onClick={increaseNeutral}
        text='neutral'
      />
      <Button
        onClick={increaseBad}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App