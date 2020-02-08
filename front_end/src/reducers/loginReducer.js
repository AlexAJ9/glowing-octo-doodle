import loginService from '../services/loginService'

export const userLogin = (data) => {
    return async dispatch => {
        const user = await loginService.login(data)
        window.localStorage.setItem(
            'loggedappUser', JSON.stringify(user)
        )
        dispatch({
            type: 'LOGIN',
            data: user
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