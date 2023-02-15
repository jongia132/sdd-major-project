import styles from './Sidebar.module.css'
import task from '../assets/icons/task.svg'
import focus from '../assets/icons/focus.svg'

const Sidebar = () => {

    const Icons = class {
        static pomodoro: "../assets/icons/av_timer.svg";
        static test: "LOL"
    }
    console.log(Icons.test)
    return(
        <nav className={styles.sidebar}>
            {/* Profile menu */}
            <div>
                <img></img>
                <span>NAME</span>
            </div>

            {/* Main navigation modules */}
            <div>
                <a href="/pomodoro">Pomodoro</a>
            </div>
            <div className={styles.menuItem}>
                <object className={styles.icon} data={Icons.pomodoro}></object>
                <span>Pomodoro timer</span>
            </div>
            <div className={styles.menuItem}>
                <object className={styles.icon} data={task}></object>
                <span>Tasks</span>
            </div>
            <div className={styles.menuItem}>
                <object className={styles.icon} data={focus}></object>
                <span>Focus</span>
            </div>
            <div className={styles.menuItem}>
                <object className={styles.icon}></object>
                <span>Schedule</span>
            </div>
            <div className={styles.menuItem}>
                <object className={styles.icon}></object>
                <span>File transfer</span>
            </div>
            {/* Settings */}
            <a href="/settings">Settings</a>
        </nav>
    )
}

export default Sidebar