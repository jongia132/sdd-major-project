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
import { Tooltip } from '@fluentui/react-components'

const Sidebar = () => {
    // Generate sidebar entries
    interface listformat {
        lnk: string
        icon: string | undefined
        name: string
    }

    // Generate all sidebar locations
    function BuildList({ lnk, icon, name }: listformat) {
        return (
            <Tooltip content={name} relationship='label' visible={state ? undefined : false} positioning="after">
                <Link to={lnk} className={styles.menuItem}>
                    <img draggable="false" className={styles.icon} src={icon}></img>
                    <span className={`${styles.navEntry}`}>{name}</span>
                    {/* hidden={state ? true : undefined} */}
                </Link>
            </Tooltip>
        )
    }

    // Toggle sidebar state
    let [state, setHidden] = React.useState(() => {
        return JSON.parse(localStorage.getItem("Sidebar.state") as string) ?? false
    })

    // Store current sidebar state
    React.useEffect(() => {
        localStorage.setItem("Sidebar.state", JSON.stringify(state))
    }, [state])

    return (
        <nav className={`${styles.root} ${state ? styles.collapsed : null} prevent-select`}>
            {/* Menu icon */}
            <img className={`${styles.menuIcon} ${styles.icon}`} src={menuIcon} onClick={() => setHidden(!state)} draggable="false"></img>

            {/* Profile menu
            <section className={styles.profileBox}>
                <img draggable="false"></img>
                <span>NAME</span>
            </section> */}

            {/* Main navigation modules */}
            <section className={styles.navList}>
                <BuildList lnk='/' icon={dashboardIcon} name="Dashboard" />
                <BuildList lnk='/pomodoro' icon={pomodoroIcon} name="Pomodoro timer" />
                <BuildList lnk="/tasks" icon={taskIcon} name="Tasks" />
                <BuildList lnk="" icon={focusIcon} name="Focus" />
                <BuildList lnk="" icon={calendarIcon} name="Schedule" />
                <BuildList lnk="/sentral" icon={undefined} name="Sentral" />
            </section>
            {/* Bottom */}
            <Tooltip content="Settings" relationship='label' positioning="after">
                <Link to={'/settings'} className={styles.bottom}>
                    <img draggable="false" className={styles.icon} src={settingsIcon}></img>
                </Link>
            </Tooltip>
        </nav>
    )
}

export default Sidebar