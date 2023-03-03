import Sidebar from "./Sidebar";
import styles from "./Layout.module.css"
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Layout