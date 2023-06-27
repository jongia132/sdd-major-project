import styles from './Pomodoro.module.css'
import React, { useRef, useState } from "react"
const Pomodoro = () => {
let interval: number
    class Timer {
        mins = 0
        secs = 0

        // constructor(mins: number, secs: number) {
        //     this.mins = mins,
        //     this.secs = secs
        // }
        startTimer(count: number) {
            this.mins = count
            console.log(this.mins)
            if (this.mins < 1 || this.mins > 99) {
                return alert("Invalid value")
            }
            btnState(!button)
            let seconds = this.mins * 60
            interval = setInterval(() => this.timer(seconds), 1000)
            // return
        }


        timer(count: number) {
            console.log(count)
            if (count > 0) {
                count -= 1
                this.mins = Math.floor(count / 60)
                this.secs = count % 60
                console.table(this)
            }
            else {
                console.log("stopping")
                this.stopTimer
            }
        }

        stopTimer(interval: number) {
            console.log("stopped")
            console.log(interval)
            clearInterval(interval)
            btnState(!button)
        }
    }

    let [button, btnState] = useState(true)
    // const timedisplay = useState(new Timer(7).timer())

    // Start/stop button

    function ToggleButton() {
        if (button) {
            console.log(minInput.current.value)
            return <button id="start" className={styles.button} onClick={() => new Timer().startTimer(2)}>START</button>
        }
        else {
            return <button id="stop" className={styles.button} onClick={() => new Timer().stopTimer(interval)}>STOP</button>
        }
    }

    const hrInput = useRef(null)
    const minInput = useRef(null)

    // Return app
    return (
        <div className={`${styles.root} ${"content"}`}>
            <h1>Pomodoro Timer</h1>
            <div className={styles.timer}>
                <progress value="0" max="60" />
                <section className={styles.digits}>
                    <input className={styles.input} type="number" min="0" max="9" step="1" ref={hrInput} />
                    <p>:</p>
                    <input className={styles.input} type="number" min="0" max="59" step="5" ref={minInput} />
                </section>
                <ToggleButton />
            </div>
        </div>
    )
}

function PomodoroWidget() {
    return (
        <p style={{ color: "black" }}>Pomodoro widget loaded</p>
    );
}
export { Pomodoro, PomodoroWidget }