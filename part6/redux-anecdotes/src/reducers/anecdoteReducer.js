import axios from "axios"
import {getAll, createAnec, updateAnec} from '../services/anecdotes'

const initialState = []

const anecReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const updated = action.data
      return state.map(anecdote => anecdote.id !== id ? anecdote : updated)
    }
    case 'CREATE_ANEC':
      return state.concat(action.data)
    default:
      return state
  }
}


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await createAnec(content)
    dispatch({
      type: 'CREATE_ANEC',
      data: newAnecdote
    })
  }
}

export const dovote = (newObject) => {
  return async dispatch => {
    const updatedAnecdote = await updateAnec(newObject)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export default anecReducer