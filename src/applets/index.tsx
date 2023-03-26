import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
import { TasksWidget } from "./Tasks";
const Index = () => {
    let user = {
        name: "Jonathan",
        year: "12",
        rollCall: "12RW"
    }
    return (
        <div className={`${styles.layout} ${"content"}`}>
            <main>
                <h1>Good morning, {user.name}.</h1>
                <p>THis is a test</p>
            </main>
            <div className={styles.widgets}>
                <div className={styles.widget}>
                    <PomodoroWidget/>
                </div>
                <div className={styles.widget}>
                    <TasksWidget/>
                </div>
            </div>
        </div>
    )
}

export default Index;