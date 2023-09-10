import React from 'react'

const Parts = (props) => {
  console.log('from Parts.jsx::',props)
  return (
    
    <div>
        <p>{props.part} {props.exercise}</p>
    </div>
  )
}

export default Parts