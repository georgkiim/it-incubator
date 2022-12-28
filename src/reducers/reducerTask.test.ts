import {v1} from "uuid";
import {reducerTask} from "./reducerTask";


test('reducerTask should remove task', () => {
    const toDoLIstId = v1();
    const id1 = v1();
    const id2 = v1();
    const startState = {
        [toDoLIstId]: [
            {id: id1, title: "HTML&CSS", isDone: true},
            {id: id2, title: "JS", isDone: true}
        ]
    }
    const endState = reducerTask(startState, {type: "REMOVE-TASK", id: id1, todoListId:toDoLIstId })
    expect(endState[toDoLIstId].length).toBe(1)
    expect(endState[toDoLIstId][0].id).toBe(id2)
    expect(endState[toDoLIstId][0].title).toBe("JS")
})




