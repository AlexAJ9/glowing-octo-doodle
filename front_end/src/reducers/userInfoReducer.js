import userService from '../services/userService'

export const initAll = (data) => {
    return async dispatch => {
        const entries = await userService.getUserInfo(data)
        dispatch({
            type: 'INIT',
            data: entries
        })
    }
}