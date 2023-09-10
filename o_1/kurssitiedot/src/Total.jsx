import React from 'react'

const Total = (props) => {
  console.log('Total::', props.parts)
  let sum = 0
  props.parts.forEach (value => {
    console.log('value', value)
    sum += value.exercises
  })
  console.log('sum:',sum)
  return (
    <div>
       <p>Number of exercises {sum}</p>
    </div>
  )
}

export default Total