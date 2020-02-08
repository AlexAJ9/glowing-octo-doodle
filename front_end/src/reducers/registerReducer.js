import signUpService from '../services/signUpService'

export const userRegister = (data) => {
    return async dispatch => {
        const userToRegister = await signUpService.register(data)
        console.log(userToRegister)

        dispatch({
            type: 'REGISTER',
            registeredUser: userToRegister
        })
    }
}

const registerReducer = (state = {}, action) => {
    console.log(action.type)
    console.log(action.registeredUser)

    switch (action.type) {
        default: return state
    }

}
export default registerReducer