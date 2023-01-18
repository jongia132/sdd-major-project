import React from 'react';
import './Pomodoro.css'
const Pomodoro = () => {
    var Time = {
        mins: 0,
        secs: 0,
        count: 0
    };

    function startTimer() {
        setTime(document.getElementById("length").value)
        if (Time.mins < 1 || Time.mins > 99) {
            return alert("Fuck you")
        }
        // eslint-disable-next-line
        else if (Time.mins == 69) {
            return alert("no")
        }
        document.getElementById("start").setAttribute('disabled', true)
        let timer = setInterval(function() {
            if (Time.count < 1) {
                document.getElementById("timer").innerText = "lol"
                clearInterval(timer)
                alert("Done!")
            }
            else {
                Time.count -= 1
                Time.mins = Math.floor(Time.count/60)
                Time.secs = Time.count % 60
                console.table(Time)
                CurrentTime()
            }
        }, 1000)
    }

    // Timer components
    function setTime(mins) {
        Time.mins = mins
        Time.count = mins*60
    }

    function CurrentTime() {
        return <span>{Time.mins}:{Time.secs}</span>;
    }

    // Return app
    return (
    <div className="pomodoro-timer">
        <h1>Funny Timer</h1>
        <p id="timer"><CurrentTime /></p>
        <input type="number" min="1" max="99" id="length" className="length" step="1"></input>
        <input type="submit" onClick={startTimer} id="start" className="start" value="Start"></input>
    </div>
    )
}
export default Pomodoro;