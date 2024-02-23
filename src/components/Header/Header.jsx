import classes from './Header.module.css';

function Header(props) {

    return (
        <div className={classes.headerContainer}>
            <form className={classes.form} onSubmit={(e) => props.handleSave(e)}>
                <input type="text"
                    style={{ border: props.message ? '1px solid red' : '' }}
                    placeholder="Add a new task"
                    value={props.inputValue.name}
                    onInput={(event) => props.setInputValue({ ...props.inputValue, name: event.target.value })} />

                <button type='submit'>Save</button>
            </form>

            {props.message && <p className={classes.alertMessage}>{props.message}</p>}
        </div>
    );
};

export default Header;