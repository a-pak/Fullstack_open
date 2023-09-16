import { useState } from 'react'
import MostVoted from './MostVoted'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Uint8Array(10))
  const [mostVoted, setMostVoted] = useState([])

  const nextAnecdote = () => {
    handler();
    setSelected(Math.floor(Math.random() * 8));
    console.log(setSelected);
  }
  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVote(newVotes);
    console.log(votes[selected])
  }
  const handler = () => { 
    console.log('jos', votes[selected], 'suurempi kuin', mostVoted[1])
    if(votes[selected] > mostVoted[1] || mostVoted[1] == null){
        console.log('true')
        setMostVoted([anecdotes[selected], votes[selected]])
    }
  }

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      <h3>Votes</h3>
      {votes[selected]}
      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      <MostVoted anecdote={mostVoted[0]} votes={mostVoted[1]} />
    </div>
  )
}

export default App