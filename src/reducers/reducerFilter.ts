import {FilterValuesType} from "../App";


export const setAllAcc = (value:FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        value
    }as const
}

type SetAllType = ReturnType<typeof setAllAcc>

 export const reducerFilter = (state:FilterValuesType, action: SetAllType) =>{
    switch (action.type){
        case 'CHANGE-FILTER': return action.value
        default: return action.value
    }
}