import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


type TodoType = addTodoType | removeTodoListAcc | renameTodoListAcc | filterTodoListAccType

type addTodoType = ReturnType<typeof addTodoListAcc>
type removeTodoListAcc = ReturnType<typeof removeTodoListAcc>
type renameTodoListAcc = ReturnType<typeof renameTodoListAcc>
type filterTodoListAccType = ReturnType<typeof filterTodoListAcc>

export const addTodoListAcc = (title: string, idTodolist: string) => {
    return {
        type: 'ADD-TODO',
        title,
        idTodolist
    } as const
}
export const removeTodoListAcc = (id: string) => {
    return {
        type: 'REMOVE-TODO',
        id
    } as const
}
export const renameTodoListAcc = (title: string, idTodolist: string) => {
    return {
        type: 'RENAME-TODO',
        title,
        idTodolist
    } as const
}
export const filterTodoListAcc = (value: FilterValuesType, todolistId: string) => {
    return {
        type: 'FILTER',
        value,
        todolistId
    } as const
}


export const reducerTodoList = (state: TodolistType[], action: TodoType): TodolistType[] => {
    switch (action.type) {
        case "ADD-TODO":
            const newTodoList: TodolistType = {id: action.idTodolist, title: action.title, filter: "all"}
            return [newTodoList, ...state]
        case "REMOVE-TODO":
            return [...state.filter(t => t.id !== action.id)]
        case "RENAME-TODO":
            return [...state.map(t => t.id === action.idTodolist ? {...t, title: action.title} : t)]
        case "FILTER":
            return [...state.map(t => t.id === action.todolistId ? {...t, filter: action.value} : t)]
        default:
            return state
    }

}