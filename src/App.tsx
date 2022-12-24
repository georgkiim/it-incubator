import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTaskAcc,
    addTaskArrayAcc,
    reducerTask,
    removeTaskAcc,
    renameTaskAcc, statusTaskAcc,
} from "./reducers/reducerTask";
import {
    addTodoListAcc,
    filterTodoListAcc,
    reducerTodoList,
    removeTodoListAcc,
    renameTodoListAcc
} from "./reducers/reducerTodoList";
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();
    let [todolists, dispatchTodo] = useReducer(reducerTodoList, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])
    const [tasks, dispatchTask] = useReducer(reducerTask, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    })
    function removeTask(id: string, todolistId: string) {
        dispatchTask(removeTaskAcc(id, todolistId))
    }
    function addTask(title: string, todolistId: string) {
        dispatchTask(addTaskAcc(title, todolistId))
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodo(filterTodoListAcc(value, todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTask(statusTaskAcc(id, isDone, todolistId))
    }
    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchTask(renameTaskAcc(id, newTitle, todolistId))
    }
    function removeTodolist(id: string) {
        dispatchTodo(removeTodoListAcc(id))
        delete tasks[id]
    }
    function changeTodolistTitle(id: string, title: string) {
        dispatchTodo(renameTodoListAcc(title, id))
    }
    function addTodolist(title: string) {
        let newTodolistId = v1();
        dispatchTodo(addTodoListAcc(title, newTodolistId))
        dispatchTask(addTaskArrayAcc(newTodolistId))
    }
    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
