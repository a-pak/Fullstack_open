import React from 'react'
import Parts from './Parts'



const Content = (props) => {
  console.log(props.parts)
  return (
    <div>
        <Parts part={props.parts[0][0]} exercise={props.parts[0][1]} />
        <Parts part={props.parts[1][0]} exercise={props.parts[1][1]} />
        <Parts part={props.parts[2][0]} exercise={props.parts[2][1]} />
    </div>
  )
}

export default Content