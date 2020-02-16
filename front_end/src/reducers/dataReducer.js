import dataService from '../services/dataService'

export const newEntry = (data) => {
    return dispatch => {
        const entry = dataService.create(data).then(response => {
            dispatch({
                type: 'CREATE',
                data: response
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! New item added!', type: 'success' }
            })
        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Minimum title length is 3 characters, 5 for description. Please try again.', type: 'negative' }
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
export const edit = (data,id) => {
    return async dispatch => {
        const entry = await dataService.update(data,id).then(response => {
            dispatch({
                type: 'UPDATE',
                data: response,
                id:id
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! Item updated!', type: 'success' }
            })

        },
            error => {
                dispatch({
                    type: 'NEW',
                    data: { message: 'Minimum title length is 3 characters, 5 for description. Please try again.', type: 'negative' }
                })
            })

    }
}
export const rateItem = (data,id) => {
    return async dispatch => {
        const entry = await dataService.rate(data,id).then(response => {
            dispatch({
                type: 'UPDATE',
                data: response,
                id:id
            })
            dispatch({
                type: 'NEW',
                data: { message: 'Success! Item Rated!', type: 'success' }
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
                id: data
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
   
    switch (action.type) {
        case 'INIT': return action.data
        case 'CREATE': return [...state, action.data]
        case 'UPDATE': return state.map(x => x.id !== action.id ? x : action.data)
        case 'DELETE': return state.filter(x => x.id !== action.id)
        default: return state
    }

}

export default dataReducer