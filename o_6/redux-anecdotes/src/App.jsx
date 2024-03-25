import { useSelector, useDispatch } from 'react-redux'
import { voteAct } from './reducers/anecdoteReducer'
import CreateAnecdote from './components/CreateAnecdote'

const App = () => {
  const anecdotes = useSelector(state => state).sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAct(id))
  }



  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <CreateAnecdote />
    </div>
  )
}

export default App