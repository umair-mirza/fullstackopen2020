import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {dovote} from '../reducers/anecdoteReducer'
import {updateAnec} from '../services/anecdotes'

const ListAnecdotes = () => {

    const anecdotes = useSelector(state => state.anecdotes)
    const searchFilter = useSelector(state => state.searchFilter)
    const dispatch = useDispatch()

    const vote = async (anecdote) => {
        const newObject = {
            content: anecdote.content,
            id: anecdote.id,
            votes: anecdote.votes + 1
        } 

        dispatch(dovote(newObject))
    }

    const sortedAnecdotes = anecdotes.sort(function(a, b) {return b.votes - a.votes})
    const filteredAnecdotes = sortedAnecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(searchFilter.toLowerCase())
    })

    const selected = searchFilter === '' ? sortedAnecdotes : filteredAnecdotes

    return (
        <div>
            {selected.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </div>
    )
}

export default ListAnecdotes