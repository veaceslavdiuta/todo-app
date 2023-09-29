import classes from './Tasks.module.css';

function Tasks(props) {

    return props.tasks.length > 0 ? (
        <ul className={classes.tasksContainer}>
            {props.tasks.map(task => (
                <li className={classes.task} key={task.id}>
                    <div className={classes.textContainer}>
                        <input type="checkbox"
                            checked={task.completed}
                            onChange={(event) => props.handleCompletedChange(task, event.target.checked)} />
                        <span style={{ textDecoration: task.completed === true ? 'line-through' : 'none' }}>
                            {task.name}
                        </span>
                    </div>

                    <div className={classes.buttonContainer}>
                        <button className={classes.editButton} style={{ backgroundColor: task.completed === true ? 'rgba(0, 128, 0, 0.527)' : 'green' }} disabled={task.completed} onClick={() => props.setInputValue(task)}>Edit</button>
                        <button className={classes.removeButton} onClick={() => props.handleRemove(task)}>Remove</button>
                    </div>
                </li>
            ))}
        </ul>
    ) : <p className={classes.noItem}>There are no tasks</p>
};
export default Tasks;