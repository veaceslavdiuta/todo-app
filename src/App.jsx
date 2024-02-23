import { useState } from "react";
import Header from "./components/Header/Header";
import Filters from "./components/Filters/Filters";
import Tasks from "./components/Tasks/Tasks";
import classes from './App.module.css';

function App() {
    const defaultTaskValue = {
        id: null,
        name: '',
        completed: false,
    };
    const storageTasks = localStorage.getItem('tasks');
    const [inputValue, setInputValue] = useState(defaultTaskValue);
    const [tasks, setTasks] = useState(storageTasks === null ? [] : JSON.parse(storageTasks));
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState('');

    function handleSave(e) {
        e.preventDefault();

        if (inputValue.name === '') {
            return setMessage('Please fill in form fields!');
        } else {
            setMessage('');
        }

        let updatedTasks;
        if (inputValue.id === null) {
            inputValue.id = tasks.length + 1;
            updatedTasks = [...tasks, inputValue];
        } else {
            const index = tasks.findIndex(item => item.id === inputValue.id);

            if (index !== -1) {
                tasks[index] = inputValue;
            }
            updatedTasks = [...tasks];
        }

        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
        setInputValue(defaultTaskValue);
    };

    const handleRemove = (task) => {
        const canRemove = window.confirm('Delete task?');

        if (canRemove) {
            const updatedTasks = tasks.filter(item => item.id !== task.id);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
        };
    };

    const handleCompletedChange = (task, checked) => {
        const index = tasks.findIndex(item => item.id === task.id);

        if (index !== -1) {
            tasks[index] = { ...task, completed: checked }
        };

        setTasks([...tasks]);
    };

    const handleClearAll = () => {
        const canClearAll = window.confirm('Delete all tasks?');

        if (canClearAll) {
            setTasks([]);
            setInputValue(defaultTaskValue);
        };
    };

    return (
        <div className={classes.App}>
            <div className={classes.appContainer}>
                <div className={classes.logoApp}>
                    <img src="https://play-lh.googleusercontent.com/-HVJ0Nk8pks9-172JJSBsORCJpKd9b2A6E6EcQfVsgQzBQgI5uqsFiy8bGSwscyD_w=w240-h480-rw" alt="logo" />
                    <h1>To-Do List..</h1>
                </div>

                <Header inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleSave={handleSave}
                    message={message}
                    setMessage={setMessage} />

                <Filters status={status}
                    setStatus={setStatus}
                    handleClearAll={handleClearAll} />

                <Tasks tasks={tasks.filter(task => {
                    if (status === null) {
                        return true;
                    } else {
                        return task.completed === status;
                    }
                })}
                    handleCompletedChange={handleCompletedChange}
                    setInputValue={setInputValue}
                    handleRemove={handleRemove} />
            </div>
        </div>
    )
}

export default App;
