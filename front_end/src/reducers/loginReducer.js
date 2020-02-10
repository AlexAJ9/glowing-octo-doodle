import loginService from '../services/loginService'

import history from '../history'
export const userLogin = (data) => {

    return dispatch => {
        const user = loginService.login(data).then(response => {
            dispatch({
                type: 'LOGIN',
                data: JSON.stringify(response)
            })
            dispatch({
                type: 'NEW',
                data: { message: `Welcome ${JSON.stringify(response.username)}`, type: 'success' }
            })
            window.localStorage.setItem(
                'loggedappUser', JSON.stringify(response)
            )
            history.push('/')
        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Invalid credentials.', type: 'negative' }
                })
            })
    }
}
const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN': return action.data
        default: return state
    }
}
export default loginReducer