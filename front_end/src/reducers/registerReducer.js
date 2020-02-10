import signUpService from '../services/signUpService'

// export const userRegister =  (data) => {
//     return async dispatch => {
//         const userToRegister = await signUpService.register(data)
//         console.log(userToRegister)

//         dispatch({
//             type: 'REGISTER',
//             registeredUser: userToRegister
//         })
//     }
// }

export const userRegister = (data) => {
    return dispatch => {
        return signUpService.register(data).then(
            response => {
                dispatch({
                    type: 'REGISTER',
                    registeredUser: response.data
                })
                dispatch({
                    type: 'NEW',
                    data: { message: 'Success! You can log in now :)', type: 'success' }
                })
            },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'There is some kind of error, try again.', type: 'negative' }
                })
            }
        )

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


