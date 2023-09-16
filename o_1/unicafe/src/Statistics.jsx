import React from 'react'
import StatisticLine from './StatisticLine'

const Statistics = ({feedback}) => {
  console.log('feedback', feedback)    
  let positive = 0
  let neutral = 0
  let negative = 0
  feedback.forEach(value => {
    if(value === '+') {
      positive++
    } else if (value === '-') {
      negative++
    } else {
      neutral++
    }
  })

  return (
    <div>
      <h3>Statistics</h3>
      {feedback.length < 1 ?
      <p>No feedback given</p>
      : <div>
        <table>
            <tbody>
              <StatisticLine text='Positive' value= {positive} />
              <StatisticLine text='Neutral' value= {neutral} /> 
              <StatisticLine text='Negative' value= {negative} /> 
              <StatisticLine text='All' value= {feedback.length} /> 
              <StatisticLine text='Average' value= {(positive - negative)/feedback.length} /> 
              <StatisticLine text='Positive %' value= {(positive/feedback.length) * 100} /> 
          </tbody>
        </table>
      </div>
      }
    </div>
  )
}

export default Statistics