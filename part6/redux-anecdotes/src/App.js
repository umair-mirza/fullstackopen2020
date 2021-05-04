import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {initializeAnecdotes} from './reducers/anecdoteReducer'
import CreateAnecdote from './components/CreateAnecdote'
import ListAnecdotes from './components/ListAnecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <ListAnecdotes />
      <CreateAnecdote />
    </div>
  )
}

export default App