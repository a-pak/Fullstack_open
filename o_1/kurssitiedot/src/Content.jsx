import React from 'react'
import Parts from './Parts'



const Content = (props) => {
  console.log('from Contents.jsx::', props.parts)
  return (
    <div>
        <Parts part={props.parts[0].name} exercise={props.parts[0].exercises} />
        <Parts part={props.parts[1].name} exercise={props.parts[1].exercises} />
        <Parts part={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  )
}

export default Content