import { useState } from 'react';

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, totalClicks, average, positive} = props
  if (!good && !neutral && !bad) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={totalClicks} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive" value={positive + "%"} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodStats = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    const totalAddition = updatedGood + neutral + bad
    setTotalClicks(totalAddition)
    setPositive(calcExpression(updatedGood, totalAddition))
    setAverage(calcAvg(updatedGood, bad, totalAddition))
  }

  const handleNeutralStats = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const totalAddition = good + updatedNeutral + bad
    setTotalClicks(totalAddition)
    setPositive(calcExpression(good, totalAddition))
    setAverage(calcAvg(good, bad, totalAddition))
  }

  const handleBadStats = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    const totalAddition = good + neutral + updatedBad
    setTotalClicks(totalAddition)
    setPositive(calcExpression(good, totalAddition))
    setAverage(calcAvg(good, updatedBad, totalAddition))
  }

  const calcExpression = (good, total) => (good / total) * 100
  const calcAvg = (good, bad, total) => (good - bad) / total

  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodStats} text='Good' />
      <Button handleClick={handleNeutralStats} text='Neutral' />
      <Button handleClick={handleBadStats} text='Bad' />
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} totalClicks={totalClicks} average={average} positive={positive} />
    </>
  )
}

export default App