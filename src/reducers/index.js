import currentUser from './currentUserData'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
})

export default rootReducer