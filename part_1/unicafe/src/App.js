import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = ({ statName, value }) => {
  console.log (statName, value)
  return (
    <tr> 
      <td>{statName}</td><td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good / all ) * 100 + "%"
  const positive = (good - bad) / all * 100 + "%"

  if (all === 0) {
    return <div>No feedback given </div>
  }
    
  
  return (
    <table>
      <tbody>
          <StatisticsLine statName= {"good"} value={good} />
          <StatisticsLine statName= {"neutral"} value ={neutral}/>
          <StatisticsLine statName = {"bad"} value ={bad}/>
          <StatisticsLine statName= {"all"} value={all}/>
          <StatisticsLine statName = {"average"} value={average}/>
          <StatisticsLine statName = {"positive"} value={positive}/>
      </tbody>
    </table>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text={"Give Feedback"} />
      <Button onClick={increaseGood} text="good"/>
      <Button onClick={increaseNeutral} text="neutral"/>
      <Button onClick={increaseBad} text="bad"/>
      <Header text={"Statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <StatisticsLine good={good} neutral={neutral} bad={bad} />
      </div>
  )
}
export default App