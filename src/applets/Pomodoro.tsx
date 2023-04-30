import styles from './Pomodoro.module.css'
import React from "react"
const Pomodoro = () => {
    let Time = {
        mins: 0,
        secs: 0,
        count: 0
    };
    let [button, btnState] = React.useState(true)
    const timedisplay = React.useState(Timer)

    function startTimer(mins: number) {
        Time.mins = mins
        if (Time.mins < 1 || Time.mins > 99) {
            return alert("Invalid value")
        }
        btnState(!button)
        Time.count = mins*60
        setTimeout(Timer, 1000)
    }

    function Timer() {
        if (Time.count > 0) {
            Time.count -= 1
            Time.mins = Math.floor(Time.count/60)
            Time.secs = Time.count % 60
            console.table(Time)
        }
        stopTimer()
    }

    // Start/stop button
    function stopTimer() {
        btnState(!button)
    }
    function ToggleButton() {
        if (button) {
            return <button id="start" className={styles.button} onClick={stopTimer}>START</button>
        }
        else {
            return <button id="stop" className={styles.button} onClick={stopTimer}>STOP</button>
        }
    }

    // Return app
    return (
    <div className={`${styles.root} ${"content"}`}>
        <h1>Pomodoro Timer</h1>
        <div className={styles.timer}>
            <progress value="0" max="60"/>
            <section className={styles.digits}>
                <input className={styles.input} type="number" min="0" max="9" step="1"/>
                <p>:</p>
                <input className={styles.input} type="number" min="0" max="59" step="5"/>
            </section>
            <ToggleButton/>
        </div>
    </div>
    )
}

function PomodoroWidget() {
    return (
        <p style={{color: "black"}}>Pomodoro widget loaded</p>
    );
}
export {Pomodoro, PomodoroWidget}