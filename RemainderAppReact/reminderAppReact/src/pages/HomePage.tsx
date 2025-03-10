import { Link } from 'react-router-dom';
import classes from './../styles/homePage.module.css'


export const HomePage = () => {
    return (
        <div className={classes.container}>
            <div className={classes.formGroup}>
            <h1>Make your remainder!</h1>
            {/* <Button type="submit">Add new remainder</Button> */}
            </div>
        </div>
    );
}