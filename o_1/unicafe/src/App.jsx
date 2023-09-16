import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'
import StatisticLine from './StatisticLine'

function App() {

  const [feedback, setFeedback] = useState([])

  const handleClick = (value) => {
    console.log(value)
    setFeedback(feedback.concat(value))
  }

  console.log(feedback)

  return (
    <>
      <h2>Give feedback</h2>
      <Button />
      <button onClick={() => handleClick('+')}>Good</button>
      <button onClick={() => handleClick('/')}>Neutral</button>
      <button onClick={() => handleClick('-')}>Bad</button>

      <Statistics
     feedback={feedback}/>
    </>
  )
}

export default App
