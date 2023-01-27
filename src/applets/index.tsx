import styles from "./index.module.css"
import Sidebar from "../components/Sidebar"
const Index = () => {
    return (
        <div className={styles.html}>
            <Sidebar/>
            <main className={styles.content}>
                <p className={styles.greeting}>Good morning, Jonathan.</p>
            </main>
            
        </div>
    )
}

export default Index;