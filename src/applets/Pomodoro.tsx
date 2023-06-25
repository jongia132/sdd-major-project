import styles from './Pomodoro.module.css'
import React, {useState} from "react"
const Pomodoro = () => {

    class Timer {
        mins = 0
        secs = 0
        count: number
        interval: any

        // constructor(input: number) {
        //     this.count = input
        // }
        startTimer(count: number) {
            this.mins = count
            console.log(this.mins)
            if (this.mins < 1 || this.mins > 99) {
                return alert("Invalid value")
            }
            btnState(!button)
            this.count = this.mins*60
            this.interval = setTimeout(this.timer, 1000)
            // return
        }


        timer(count: number) {
            console.log(this.count)
            if (this.count > 0) {
                this.count -= 1
                this.mins = Math.floor(this.count/60)
                this.secs = this.count % 60
                console.table(this)
                return
            }
            // this.stopTimer
            console.log("stopping")
            return
        }

        stopTimer() {
            console.log("stopped")
            clearInterval(this.interval)
            btnState(!button)
        }
    }
        
    let [button, btnState] = useState(true)
    // const timedisplay = useState(new Timer(7).timer())

    // Start/stop button

    function ToggleButton() {
        if (button) {
            return <button id="start" className={styles.button} onClick={() => new Timer().startTimer(6)}>START</button>
        }
        else {
            return <button id="stop" className={styles.button} onClick={() => new Timer().stopTimer()}>STOP</button>
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
                <p><span>6</span>:<span>30</span></p>
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