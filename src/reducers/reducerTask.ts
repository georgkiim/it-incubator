import React, {ReactPropTypes} from "react";
import {TaskType} from "../Todolist";
import {v1} from "uuid";



type RemoveTaskActionType = ReturnType<typeof removeTaskAcc>
type ADDTaskActionType = ReturnType<typeof addTaskAcc>
export type TaskActionType = RemoveTaskActionType | ADDTaskActionType

export const removeTaskAcc = (id:string) => {
    return {
        type: "REMOVE-TASK",
        id
    }as const
}
export const addTaskAcc = (title:string) => {
    return {
        type: "ADD-TASK",
        title
    }as const
}


export const reducerTask = (state: TaskType[], action: TaskActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return state.filter(t => t.id != action.id)
        case "ADD-TASK":
            const task = {id: v1(), title: action.title, isDone: false};
            const newTasks = [task, ...state];
            return newTasks;

        default:
            return state
    }
}




