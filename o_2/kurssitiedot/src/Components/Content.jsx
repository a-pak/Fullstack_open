import React from 'react'
import Parts from './Parts'



const Content = ({parts}) => {
  return (
    <div>
        {parts.map(part => {
          return <Parts key={part.id} part={part.name} exercises={part.exercises}/>
        })}
    </div>
  )
}

export default Content