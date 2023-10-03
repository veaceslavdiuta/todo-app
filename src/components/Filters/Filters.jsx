import classes from './Filters.module.css';

function Filters(props) {

    return (
        <div className={classes.filters}>
            <ul className={classes.listContainer}>
                <li style={{ color: props.status === null ? 'rgb(66, 181, 219)' : 'black' }} onClick={() => props.setStatus(null)}>All</li>
                <li style={{ color: props.status === false ? 'rgb(66, 181, 219)' : 'black' }} onClick={() => props.setStatus(false)}>Pending</li>
                <li style={{ color: props.status === true ? 'rgb(66, 181, 219) ' : 'black' }} onClick={() => props.setStatus(true)}>Completed</li>
            </ul>

            <button onClick={() => props.handleClearAll()}>Clear All</button>
        </div>
    );
};

export default Filters;