import React from 'react'
import {useDispatch} from 'react-redux'
import {filterAnecdotes} from '../reducers/filterReducer'


const Filter = () => {
    const dispatch = useDispatch()

    const filterHandler = (e) => {
        const searchtext = e.target.value
        dispatch(filterAnecdotes(searchtext))
    }

    return (
        <div>
            filter: <input type="text" onChange={filterHandler} />
        </div>
    )
}

export default Filter