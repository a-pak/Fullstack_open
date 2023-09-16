import React, {useState} from 'react'


const MostVoted = ({anecdote, votes}) => {
    console.log('From most voted ',anecdote, votes)
    return (
    <div>
        <h3>Most Voted Anecdote:</h3>
        <p>{anecdote}</p>
        <p>{votes}</p>
    </div>
  )
}

export default MostVoted