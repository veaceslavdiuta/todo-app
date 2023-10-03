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
  const [inputValue, setInputValue] = useState(defaultTaskValue);
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (inputValue.name === '') {
      return setMessage('Please fill in form fields!');
    } else {
      setMessage('');
    };

    if (inputValue.id === null) {
      inputValue.id = tasks.length + 1;

      setTasks([...tasks, inputValue])
    } else {
      const index = tasks.findIndex(item => item.id === inputValue.id);

      if (index !== -1) {
        tasks[index] = inputValue;
      };

      setTasks([...tasks]);
    };

    setInputValue(defaultTaskValue);
  };

  const handleRemove = (task) => {
    const canRemove = window.confirm('Delete task?');

    if (canRemove) {
      setTasks([...tasks.filter(item => item.id !== task.id)]);
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
        <h1>To-Do list..</h1>
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
