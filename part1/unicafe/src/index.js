import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Statistics from './components/Statistics'
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  const average = (good - bad) / total

  const percentage = (good * 100) / total

  const calculate = (value, adder) => {
    adder(value + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => calculate(good, setGood)} text='good' />
      <Button onClick={() => calculate(neutral, setNeutral)} text='neutral' />
      <Button onClick={() => calculate(bad, setBad)} text='bad' />

      <Statistics 
      total={total} 
      average={average} 
      percentage={percentage}
      good={good}
      neutral={neutral}
      bad={bad}
       />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
