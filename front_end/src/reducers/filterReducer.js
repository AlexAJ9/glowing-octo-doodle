
export const filterDreams = (data) => {
    return{
        type:'NEW_FILTER',
        data:data
    }
}

const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'NEW_FILTER': return action.data
        default: return state
    }
}

export default filterReducer