import styles from './Pomodoro.module.css'
import React from "react"
const Pomodoro = () => {
    let Time = {
        mins: 0,
        secs: 0,
        count: 0
    };

    // function startTimer(mins: number) {
    //     setTime(mins)
    //         if (Time.mins < 1 || Time.mins > 99) {
    //         return alert("Invalid value")
    //     }
    //     document.getElementById("start").setAttribute('disabled', true)
    //     let timer = setInterval(function() {
    //         if (Time.count < 1) {
    //             document.getElementById("timer").innerText = "lol"
    //             clearInterval(timer)
    //             alert("Done!")
    //         }
    //         else {
    //             Time.count -= 1
    //             Time.mins = Math.floor(Time.count/60)
    //             Time.secs = Time.count % 60
    //             console.table(Time)
    //             return <span>{Time.mins}:{Time.secs}</span>;
    //         }
    //     }, 1000)
    // }

    // Timer components
    function setTime(mins: number) {
        Time.mins = mins
        Time.count = mins*60
    }

    // Return app
    return (
    <div>
        <span>Pomodoro Timer</span>
        <p className={styles.timer}></p>
        <input type="number" min="1" max="99" id="length" className={styles.input} step="1"></input>
        {/* <button type="submit" onClick={startTimer} id="start" className={styles.button} value="Start"></button> */}
    </div>
    )
}

class PomodoroWidget extends React.Component {
    render() {
        return (
            <p>THIS IS WORKING!</p>
        );
    }
}
export {Pomodoro, PomodoroWidget}