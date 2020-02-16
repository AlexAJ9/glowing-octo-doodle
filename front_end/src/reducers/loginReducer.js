import loginService from '../services/loginService'

export const userLogin = (data) => {
    return dispatch => {
        const user = loginService.login(data).then(response => {
            dispatch({
                type: 'LOGIN',
                data: response
            })
            dispatch({
                type: 'NEW',
                data: { message: `Welcome ${response.username}!`, type: 'success' }
            })
            window.localStorage.setItem(
                'loggedappUser', JSON.stringify(response)
            )

        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Invalid credentials.', type: 'negative' }
                })
            })
    }
}

export const userData = (data) => {
    return dispatch => {
        dispatch({
            type: 'REFRESH',
            data: data
        })
        // window.localStorage.setItem(
        //     'loggedappUser', JSON.stringify(response)
        // )

    }
}
export const userLogOut = () => {
    return dispatch => {
        dispatch({
            type: 'LOGOUT'
        })
        dispatch({
            type: 'NEW',
            data: { message: `See ya later.`, type: 'success' }
        })
    }
}
const initialState = { username: null, token: null, id: null }
const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': return action.data
        case 'LOGOUT': return initialState
        case 'REFRESH': return action.data
        default: return state
    }
}
export default loginReducer