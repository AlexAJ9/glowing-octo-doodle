
import dataService from '../services/dataService'


export const newEntry = (data) => {
    return async dispatch => {
        const entry = await dataService.create(data)
        dispatch({
            type: 'CREATE',
            data: entry
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
        const entry = await dataService.update(data)
        dispatch({
            type: 'UPDATE',
            data: entry
        })
    }
}
export const update = (data) => {
    return async dispatch => {
        const entry = await dataService.remove(data)
        dispatch({
            type: 'DELETE',
            id: data.id
        })
    }
}

const dataReducer = (state = [], action) => {
    console.log(action.type)

    switch (action.type) {
        case 'INIT': return action.data
        case 'CREATE': return [...state,action.data]
        case 'UPDATE': return state.map(x => x.id === action.data.id ? x : action.data)
        case 'DELETE': return state.filter(x => x.id !== action.data.id)
        default: return state
    }

}

export default dataReducer