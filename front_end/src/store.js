import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import dataReducer from './reducers/dataReducer'
import loginReducer from './reducers/loginReducer'
import filterReducer from './reducers/filterReducer'
import registerReducer from './reducers/registerReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    data: dataReducer,
    filter: filterReducer,
    user: loginReducer,
    registeredUser: registerReducer,
    notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store