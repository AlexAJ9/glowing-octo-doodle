export const newNotification = (data) => {
    return dispatch => {
        dispatch({
            type: 'NEW',
            data: data
        })

    }
}
const initialState = { message: null, type: null }

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW': return action.data
        default: return state
    }
}
export default notificationReducer
