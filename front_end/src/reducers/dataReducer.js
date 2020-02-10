
import dataService from '../services/dataService'


export const newEntry = (data) => {
    return dispatch => {
        const entry = dataService.create(data).then(response => {
            dispatch({
                type: 'CREATE',
                data: entry
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! New item added!', type: 'success' }
            })
        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Error creating item. Please try again.', type: 'negative' }
                })
            })

    }
}
export const initAll = (data) => {
    return async dispatch => {
        const entries = await dataService.getAll(data)
        dispatch({
            type: 'INIT',
            data: entries
        })
    }
}
export const edit = (data) => {
    return async dispatch => {
        const entry = await dataService.update(data).then(response => {
            dispatch({
                type: 'UPDATE',
                data: entry
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! Item updated!', type: 'success' }
            })

        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Error updating item. Please try again.', type: 'negative' }
                })
            })

    }
}
export const remove = (data) => {
    return async dispatch => {
        const entry = await dataService.remove(data).then(response => {
            dispatch({
                type: 'DELETE',
                id: data.id
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! Item removed!', type: 'success' }
            })
        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Error deleting item. Please try again.', type: 'negative' }
                })
            })

    }
}

const dataReducer = (state = [], action) => {
    console.log(action.type)

    switch (action.type) {
        case 'INIT': return action.data
        case 'CREATE': return [...state, action.data]
        case 'UPDATE': return state.map(x => x.id === action.data.id ? x : action.data)
        case 'DELETE': return state.filter(x => x.id !== action.data.id)
        default: return state
    }

}

export default dataReducer