import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [maxAnecdote, setMaxAnecdote] = useState("")

  const randomGenerator = (min=0, max=props.anecdotes.length) => {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const anecdoteSelector = () => {
    setSelected(randomGenerator())
  }

  const doVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)

    const max = Math.max(...newVotes)
    const maxAnec = anecdotes.filter((item, i) => i === newVotes.indexOf(max))
    setMaxAnecdote(maxAnec)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <button onClick={doVote}>vote</button>
        <button onClick={anecdoteSelector}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {maxAnecdote}
        <div>has {Math.max(...votes)} votes</div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)