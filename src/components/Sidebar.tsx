import styles from './Sidebar.module.css'
import { Link } from "react-router-dom"
import React from 'react'
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
    var [state, setHidden] = React.useState(false)
    return(
        <nav className={`${styles.sidebar} ${state ? styles.collapsed : null}`}>
            {/* Menu icon */}
            <img className={`${styles.menuIcon} ${styles.icon}`} src={menuIcon} onClick={() => setHidden(!state)} draggable="false"></img>

            {/* Profile menu */}
            <section className={styles.profileBox}>
                <img draggable="false"></img>
                <span>NAME</span>
            </section>

            {/* Main navigation modules */}
            <section className={styles.navList}>
                <Link to={'/'} className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={dashboardIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>Dashboard</span>
                </Link>
                <Link to={'/pomodoro'} className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={pomodoroIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>Pomodoro timer</span>
                </Link>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={taskIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>Tasks</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={focusIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>Focus</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={calendarIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>Schedule</span>
                </div>
                <div className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={uploadIcon}></img>
                    <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>File transfer</span>
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