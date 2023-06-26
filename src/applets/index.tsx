import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
import { TasksWidget } from "./Tasks";
const Index = () => {
    let user = {
        name: "Jonathan",
        year: "12",
        rollCall: "12RW"
    }

    function Greeting() {
        let hour:number = new Date().getHours()
        let msg
        if (hour < 12) msg = "Good morning";
        else if (hour < 18) msg = "Good afternoon";
        else msg = "Good evening";
        return(<span>{msg}</span>)
    }

    return (
        <div className={`${styles.root} ${"content"}`}>
            <main>
                <h1><Greeting />, {user.name}.</h1>
                <p>THis is a test</p>
            </main>
            <div className={styles.widgets}>
                <div className={styles.widget}>
                    <PomodoroWidget />
                </div>
                <div className={styles.widget}>
                    {/* <TasksWidget /> */}
                </div>
            </div>
        </div>
    )
}

export default Index;