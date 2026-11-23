import {useState} from "react";
import "../ui/task.css";

export default function TaskPage() {
    const [task, setTask] = useState([
        {id:1, title: "Task 1", completed: false},
        {id:2, title: "Task 2", completed: false},
        {id:3, title: "Task 3", completed: false}
    ])

    if (task.length === 0) {
        return (
            <main className="task-page">
                <h2 className="task-page__title">Task Page</h2>
                <p className="task-page__empty">Задач Нету</p>
            </main>
        )
    } else {
        return(
        <main className="task-page">
            <h2 className="task-page__title">Task Page</h2>
            <section className="task-list">
                {task.map(({id, title, completed}) => (
                    <section className="task-item" key={id}>
                        <input
                            type="checkbox"
                            id={`task-${id}`}
                            checked={completed}
                            onChange={() =>
                                setTask((tasks) =>
                                    tasks.map((item) =>
                                        item.id === id
                                            ? {...item, completed: !item.completed}
                                            : item
                                    )
                                )
                            }
                        />
                        {completed ? (
                            <del className="task-item__title">{title}</del>
                        ) : (
                            <h4 className="task-item__title">{title}</h4>
                        )}
                    </section>
                ))}
            </section>
        </main>
    )}                      
    }
