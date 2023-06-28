import { Button, Spinner } from '@fluentui/react-components';
import styles from './Pomodoro.module.css'
import React, { useRef, useState } from "react"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Pomodoro = () => {
    // Track all variables
    const intervalRef = useRef<number>()
    const minInput = useRef<HTMLInputElement>(null)
    let mins = 0
    let hrs = 0
    let secs = 0
    let count = 0
    const [countdown, setCountdown] = useState(0)
    const [progressbar, setProgressbar] = useState(0)
    const [displayMins, setDisplayMins] = useState("")
    const [displaySecs, setDisplaySecs] = useState("")
    let [button, btnState] = useState(true)


    // CHECK IF AN EXISTING TIMER IS ALREADY RUNNING
    // if (!intervalRef.current) {
    //     btnState(false)
    // }

    // Handle start button
    function startTimer() {
        let inputMins = minInput.current.value as unknown as number
        if (inputMins < 1 || inputMins > 300) {
            return alert("Invalid value")
        }
        btnState(button => !button)
        mins = inputMins
        count = mins * 60
        // count = 10
        setDisplayMins(mins.toString())
        setDisplaySecs("00")
        setProgressbar(count)
        setCountdown(count)
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(timer, 1000)
    }

    // Timer itself
    function timer() {
        if (count > 0) {
            count -= 1
            mins = Math.floor(count / 60)
            // hrs = Math.floor(mins / 60)
            if (secs <= 10 && secs != 0) {
                setDisplaySecs(("0" + (secs - 1)).toString())
            }
            else {
                secs = count % 60
                setDisplaySecs(secs.toString())
            }
            secs = count % 60
            setDisplayMins(mins.toString())
            setCountdown(count)
        }
        else {
            new window.Notification("Pomodoro Timer", { body: "Timer Finished" })
            clearInterval(intervalRef.current)
            btnState(button => !button)
        }
    }

    // Stop button function
    function stopTimer() {
        clearInterval(intervalRef.current)
        btnState(button => !button)
        new window.Notification("Pomodoro Timer", { body: "Timer Stopped" })
    }

    // Start/stop button
    function ToggleButton() {
        if (button) {
            return (<Button id="start" size='large' className={styles.button} appearance="primary" onClick={() => startTimer()}>START</Button>)
        }
        else {
            return (<Button id="stop" size="large" className={styles.button} onClick={() => stopTimer()}>STOP</Button>)
        }
    }

    // Timer presets
    function Presets() {
        return (
            <div className={styles.presets}>
                <p>Preset 1</p>
                <p>2</p>
                <p>3</p>
            </div>
        )
    }
    // Return app
    return (
        <div className={`${styles.root} ${"content"}`}>
            <div className={styles.timer}>
            <h1>Pomodoro Timer</h1>
                <section className={styles.digits}>
                    {button ? <><input className={styles.input} type="number" min="5" max="300" step="5" defaultValue={25} ref={minInput} /><p>Minutes</p></> :
                        <div className={styles.circle}>
                            <CircularProgressbar value={countdown} maxValue={progressbar} text={`${displayMins}:${displaySecs}`} styles={
                                {
                                    path: {
                                        stroke: 'white',
                                        strokeLinecap: 'butt',
                                    },
                                    text: {
                                        fill: 'white'
                                    },
                                    trail: {
                                        stroke: 'gray'
                                    },
                                    background: {
                                        fill: 'red'
                                    }
                                }
                            } />
                        </div>
                    }
                </section>
                <Presets />
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