import styles from './Sidebar.module.css'
const Sidebar = () => {
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
            {/* Settings */}
            <a href="/settings">Settings</a>
        </nav>
    )
}

export default Sidebar