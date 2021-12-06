import React, { useState } from 'react'


const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
       {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  return (
    <>
    <tr>good {good}</tr>
    <tr>neutral {neutral}</tr>
    <tr>bad {bad}</tr>
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