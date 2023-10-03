import React from 'react'

const Parts = ({id, part, exercises}) => {
  return (
    <div>
        <p>{part} {exercises}</p>
    </div>
  )
}

export default Parts