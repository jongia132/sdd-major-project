import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
const Index = () => {
    let user = {
        name: "Jonathan",
        year: "12",
        rollCall: "12RW"
    }
    return (
        <div>
            <main className={styles.content}>
                <p className={styles.greeting}>Good morning, {user.name}.</p>
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