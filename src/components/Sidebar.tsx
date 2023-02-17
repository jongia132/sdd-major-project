import styles from './Sidebar.module.css'
import { Link } from "react-router-dom"

// Icons
import dashboardIcon from "../assets/icons/dashboard.svg"
import menuIcon from "../assets/icons/menu.svg"
import pomodoroIcon from "../assets/icons/av_timer.svg"
import taskIcon from '../assets/icons/task.svg'
import focusIcon from '../assets/icons/focus.svg'
import calendarIcon from '../assets/icons/calendar.svg'
import uploadIcon from '../assets/icons/folder_upload.svg'
import settingsIcon from '../assets/icons/settings.svg'



const Sidebar = () => {
    return(
        <nav className={styles.sidebar}>
            {/* Menu icon */}
            <img className={`${styles.menuIcon} ${styles.icon}`} src={menuIcon} draggable="false"></img>

            {/* Profile menu */}
            <section className={styles.profileBox}>
                <img draggable="false"></img>
                <span>NAME</span>
            </section>

            {/* Main navigation modules */}
            <section className={styles.navList}>
                <Link to={'/'} className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={dashboardIcon}></img>
                    <span className={styles.navEntry}>Dashboard</span>
                </Link>
                <Link to={'/pomodoro'} className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={pomodoroIcon}></img>
                    <span className={styles.navEntry}>Pomodoro timer</span>
                </Link>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={taskIcon}></img>
                    <span className={styles.navEntry}>Tasks</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={focusIcon}></img>
                    <span className={styles.navEntry}>Focus</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={calendarIcon}></img>
                    <span className={styles.navEntry}>Schedule</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={uploadIcon}></img>
                    <span className={styles.navEntry}>File transfer</span>
                </div>
            </section>
            
            {/* Bottom */}
            <Link to={'/settings'} className={styles.bottom}>
                <img draggable="false" className={styles.icon} src={settingsIcon}></img>
            </Link>
        </nav>
    )
}

export default Sidebar