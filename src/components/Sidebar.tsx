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
    // Generate sidebar entries
    interface listformat {
        lnk: string
        icon: string
        name: string
    }
    function BuildList({lnk, icon, name}: listformat) {
        return(
            <Link to={lnk} className={styles.menuItem}>
                <img draggable="false" className={styles.icon} src={icon}></img>
                <span className={`${styles.navEntry} ${state ? styles.hidden : null}`}>{name}</span>
            </Link>
        )
    }

    // Toggle sidebar state
    let [state, setHidden] = React.useState(false)
    return(
        <nav className={`${styles.sidebar} ${state ? styles.collapsed : null} prevent-select`}>
            {/* Menu icon */}
            <img className={`${styles.menuIcon} ${styles.icon}`} src={menuIcon} onClick={() => setHidden(!state)} draggable="false"></img>

            {/* Profile menu
            <section className={styles.profileBox}>
                <img draggable="false"></img>
                <span>NAME</span>
            </section> */}

            {/* Main navigation modules */}
            <section className={styles.navList}>
                <BuildList lnk='/' icon={dashboardIcon} name="Dashboard"/>
                <BuildList lnk='/pomodoro' icon={pomodoroIcon} name="Pomodoro timer"/>
                <BuildList lnk="/tasks" icon={taskIcon} name="Tasks"/>
                <BuildList lnk="" icon={focusIcon} name="Focus"/>
                <BuildList lnk="" icon={calendarIcon} name="Schedule"/>
                <BuildList lnk="" icon={uploadIcon} name="File transfer"/>
            </section>
            
            {/* Bottom */}
            <Link to={'/settings'} className={styles.bottom}>
                <img draggable="false" className={styles.icon} src={settingsIcon}></img>
            </Link>
        </nav>
    )
}

export default Sidebar