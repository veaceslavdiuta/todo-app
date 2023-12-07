import classes from './Header.module.css';

function Header(props) {

    return (
        <div>
            <div className={classes.headerContainer}>
                <input type="text"
                    placeholder="Add a new task"
                    value={props.inputValue.name}
                    onInput={(event) => props.setInputValue({ ...props.inputValue, name: event.target.value })} />

                <button onClick={() => props.handleSave()}>Save</button>
            </div>

            {props.message && <p className={classes.alertMessage}>{props.message}</p>}
        </div>
    );
};

export default Header;