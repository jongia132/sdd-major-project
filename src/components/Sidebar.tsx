import styles from './Sidebar.module.css'

// Icons
import menuIcon from "../assets/icons/menu.svg"
import pomodoroIcon from "../assets/icons/av_timer.svg"
import taskIcon from '../assets/icons/task.svg'
import focusIcon from '../assets/icons/focus.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import uploadIcon from '../assets/icons/folder_upload.svg'

const Sidebar = () => {
    return(
        <nav className={styles.sidebar}>
            {/* Menu icon */}
            <object className={styles.icon} data={menuIcon}></object>

            {/* Profile menu */}
            <section className={styles.profileBox}>
                <img></img>
                <span>NAME</span>
            </section>

            {/* Main navigation modules */}
            <section className={styles.navList}>
                <div>
                    <a href="/pomodoro">Pomodoro</a>
                </div>
                <div className={styles.menuItem}>
                    <object className={styles.icon} data={pomodoroIcon}></object>
                    <span>Pomodoro timer</span>
                </div>
                <div className={styles.menuItem}>
                    <object className={styles.icon} data={taskIcon}></object>
                    <span>Tasks</span>
                </div>
                <div className={styles.menuItem}>
                    <object className={styles.icon} data={focusIcon}></object>
                    <span>Focus</span>
                </div>
                <div className={styles.menuItem}>
                    <object className={styles.icon} data={calendarIcon}></object>
                    <span>Schedule</span>
                </div>
                <div className={styles.menuItem}>
                    <object className={styles.icon} data={uploadIcon}></object>
                    <span>File transfer</span>
                </div>
            </section>
            
            {/* Settings */}
            <a href="/settings">Settings</a>
        </nav>
    )
}

export default Sidebar