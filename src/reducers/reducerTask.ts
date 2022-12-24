import React, {ReactPropTypes} from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TasksStateType} from "../App";


type RemoveTaskActionType = ReturnType<typeof removeTaskAcc>
type ADDTaskActionType = ReturnType<typeof addTaskAcc>
type  addTaskArrayType = ReturnType<typeof addTaskArrayAcc>
type  renameTaskAccType = ReturnType<typeof renameTaskAcc>
type  statusTaskType = ReturnType<typeof statusTaskAcc>
export type TaskActionType =
    ADDTaskActionType
    | RemoveTaskActionType
    | addTaskArrayType
    | renameTaskAccType
    | statusTaskType

export const removeTaskAcc = (id: string, todoListId: string) => {
    return {
        type: "REMOVE-TASK",
        id,
        todoListId
    } as const
}
export const addTaskAcc = (title: string, todoListId: string) => {
    return {
        type: "ADD-TASK",
        title,
        todoListId
    } as const
}
export const addTaskArrayAcc = (idTodolist: string) => {
    return {
        type: "ADD-TASK-ARRAY",
        idTodolist
    } as const
}
export const renameTaskAcc = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "RENAME-TASK",
        id, newTitle, todolistId
    } as const
}
export const statusTaskAcc = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "STATUS",
        id, isDone, todolistId
    } as const
}


export const reducerTask = (state: TasksStateType, action: TaskActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: [...state[action.todoListId].filter(t => t.id !== action.id)]}
        case "ADD-TASK":
            const task = {id: v1(), title: action.title, isDone: false};
            const newTasks = [task, ...state[action.todoListId]];
            // return newTasks;
            return {...state, [action.todoListId]: newTasks}
        case "ADD-TASK-ARRAY":
            return {...state, [action.idTodolist]: []}
        case "RENAME-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.newTitle
                } : t)]
            }
        case "STATUS":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)]
            }
        default:
            return state
    }
}




