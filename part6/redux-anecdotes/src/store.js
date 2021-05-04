import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import anecReducer from './reducers/anecdoteReducer'
import notifReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecReducer,
    notification: notifReducer,
    searchFilter: filterReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store