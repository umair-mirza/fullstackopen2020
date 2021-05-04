import React from 'react'
import {useDispatch} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'

const CreateAnecdote = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        dispatch(createAnecdote(content))

        dispatch(notify('Successfully created', 3000))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div>
                    <input type="text" name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateAnecdote