import { useState } from 'react';

interface Task {
    id: string;
    name: string;
    isCompleted: boolean;
}

const TodoApp = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskName, setTaskName] = useState('');
    const [showCompleted, setShowCompleted] = useState(false);

    // Add new task
    const submitHandler = () => {
        if (!taskName.trim()) return; // avoid empty tasks
        const newTask: Task = {
            id: Date.now().toString(),
            name: taskName,
            isCompleted: false,
        };
        setTasks(prev => [...prev, newTask]);
        setTaskName('');
    };

    // Toggle task completion
    const markTaskDone = (id: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
            )
        );
    };

    // Filter tasks
    const filteredTasks = showCompleted
        ? tasks.filter(task => task.isCompleted)
        : tasks;

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>

            <h2>Todo App</h2>

            <h4>Filter task by checking</h4>
            <div style={{ marginTop: '20px' }}>
                <label>
                    <input
                        type="checkbox"
                        checked={showCompleted}
                        onChange={() => setShowCompleted(prev => !prev)}
                    />{' '}
                    Show completed tasks only
                </label>
            </div>

            <hr />

            <div style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="Enter your task"
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                    style={{ flex: 1 }}
                />
                <button onClick={submitHandler}>Add</button>
            </div>

            <div style={{ marginTop: '20px' }}>
                {filteredTasks.length === 0 ? (
                    <p>No tasks to show</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {filteredTasks.map(task => (
                            <li
                                key={task.id}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '5px 0',
                                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                                }}
                            >
                                {task.name}
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={() => markTaskDone(task.id)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>


        </div>
    );
};

export default TodoApp;
