import currentUser from './currentUserData'
import currentItem from './itemData'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    currentItem
})

export default rootReducer