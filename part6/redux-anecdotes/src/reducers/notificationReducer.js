
const initialState = null

const notifReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'NOTIFY':
            return action.message
        case 'HIDE_NOTIFY':
            return null
        default:
            return state
    }
}


export const notify = (message, time) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            message: message
        })

        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFY',
            })
        }, time)
    }
}

export default notifReducer