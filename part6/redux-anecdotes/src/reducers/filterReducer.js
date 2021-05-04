
const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_FILTER': {
            return action.filter
        }
        default:
            return state
    }
}

export const filterAnecdotes = (filter) => {
    return {
        type: 'SET_FILTER',
        filter: filter
    }
}

export default filterReducer