import { Pomodoro } from "./Pomodoro";
import { Tasks } from "./Tasks";
import styles from "./Focus.module.css"

export default function Focus() {
    return (
            <div className={styles.root}>
                <Pomodoro />
                <webview src="https://music.youtube.com/" style={{ "height": "100dvh" }}></webview>
            </div>
    )
}