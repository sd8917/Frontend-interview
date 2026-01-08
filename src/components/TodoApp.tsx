import React, { useState } from 'react'

const TodoApp = () => {
    const [tasks, setTasks] = useState([
        { id: "", name: "", isCompleted: false },
    ])

    const SubmitHandler = () => {
        console.log('submit handler');

        setTasks((prev)=> [...prev, ])
    }

    const MarkTaskDone = (e: any) => {
        console.log('Mark done', e.target.value);
    }
    return (
        <div>
            <input type='text' placeholder='enter your task' />
            <button onClick={SubmitHandler}></button>


            <div>
                {tasks.map((task) => {
                    return <div style={{display: "flex", alignContent: "center", inset: 0}}>
                        <li>{task.name}</li>
                        <input checked={task.isCompleted} type='checkbox' />
                    </div>
                })}
            </div>

            <div>Filter the task which are done</div>
            <div>

            </div>
        </div>
    )
}

export default TodoApp
