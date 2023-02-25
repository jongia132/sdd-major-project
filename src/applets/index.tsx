import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
const Index = () => {
    return (
        <div className={styles.html}>
            <main className={styles.content}>
                <p className={styles.greeting}>Good morning, Jonathan.</p>
            </main>
            <div className={styles.widgets}>
                <div className={styles.widget}>
                    <PomodoroWidget/>
                </div>
                <div className={styles.widget}>
                    <PomodoroWidget/>
                </div>
            </div>
        </div>
    )
}

export default Index;