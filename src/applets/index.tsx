import { Display, Title1 } from "@fluentui/react-components";
import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
import { TasksWidget } from "./Tasks";
const Index = () => {
    let user = {
        name: localStorage.getItem("user.name"),
        year: localStorage.getItem("user.year"),
        rollCall: localStorage.getItem("user.rollCall")
    }

    function Greeting() {
        let hour: number = new Date().getHours()
        let msg
        if (hour < 12) msg = "Good morning";
        else if (hour < 18) msg = "Good afternoon";
        else msg = "Good evening";
        return (<span>{msg}</span>)
    }

    return (
        <div className={`${styles.root} ${"content"}`}>
            <main>
                <h1><Greeting />, {user.name}.</h1>
                <div className={styles.hero}>
                    <div>
                        <Display className={styles.time}>{new Date().getHours()}:{new Date().getMinutes()}</Display>
                        <p className={styles.date}>{new Date().getDate()}/{new Date().getMonth()}/{new Date().getFullYear()}</p>
                    </div>
                </div>
            </main>
            {/* <div className={styles.widgets}>
                <div className={styles.widget}>
                    <PomodoroWidget />
                </div>
                <div className={styles.widget}>
                    <TasksWidget />
                </div>
            </div> */}
        </div>
    )
}

export default Index;