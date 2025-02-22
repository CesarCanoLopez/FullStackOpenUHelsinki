import { useState } from 'react'

const StatisticLine = ({text,value}) => <tr><th>{text}</th><th>{value}</th></tr>

const Statistics = ({good, bad, neutral, all}) => {
  if(all) {
    return(
      <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={(good - bad)/all} />
          <StatisticLine text={"positive"} value={good/all * 100 + "%"} />
        </tbody>
      </table>
      </>
    )
  }
  else{
    return (<p>No feedback given</p>)
  }  
}

const Button = ({onClick, text}) => {
  console.log({onClick, text})
  return (      
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all +1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all +1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all +1)
  }

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text={"good"} />
        <Button onClick={handleNeutralClick} text={"neutral"} />
        <Button onClick={handleBadClick} text={"bad"} /> 
        <Statistics good={good} neutral={neutral} bad={bad} all={all} />
      </div>
    </>
  )
}

export default App