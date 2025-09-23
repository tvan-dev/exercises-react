import { useState } from "react";
// import "./App.css";

export default function Todo() {


    const [task, setTask] = useState("")
    const [tasks, setTasks] = useState(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks"))
        return storedTasks ?? []
    })

    

    
    function handleSubmit(e) {
        e.preventDefault()
        setTasks(prev => {
            const newTasks =  [...prev,task]
            const jsonTasks = JSON.stringify(newTasks)
            localStorage.setItem("tasks", jsonTasks)
            return newTasks
        })
        setTask("")
    }
    return (
        <div className="todo-app">
            <h1>My todo list</h1>
            <form action="" onSubmit = {handleSubmit}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)}/>
                <button>Add</button>
            </form>
            <ul>
                {tasks.map((task, index) => {
                    return <li key={index}>{task}</li>
                })}
            </ul>
        </div>
    )
}
//  