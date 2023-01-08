import React from 'react';
const Pomodoro = () => {
    var idiot = null
    async function timer() {
        console.log(mins.innerText, secs.innerText)
        if (secs.innerText < 1 && mins.innerText < 1) {
            document.getElementById("timer").innerText = "lol"
            clearInterval(idiot)
            const sound = new Audio("lol.mp3")
            sound.play()
        }
        if (mins.innerText > 0 && secs.innerText == 0) {
            mins.innerText -= 1
            secs.innerText = 59
        }
        else {
            if (secs.innerText <= 10) {
                secs.innerText = "0" + (secs.innerText -1)
            }
            else {
                secs.innerText -= 1
            }
        }
    }
    function startTimer() {
        if (document.getElementById('length').value < 1 || document.getElementById('length').value > 99) {
            return alert("Fuck you")
        }
        else if (document.getElementById('length').value == 69) {
            return alert("no")
        }
        document.getElementById("start").setAttribute('disabled', true)
        mins.innerText = document.getElementById("length").value
        idiot = setInterval(timer, 1000);
    }

    // Return app
    return (
    <div className="pomodoro-timer">
        <h1>Funny Timer</h1>
        <p className="timer"><span className="mins">0</span>:<span className="secs">00</span></p>
        <input type="number" min="1" max="99" className="length" step="1"></input>
        <input type="submit" onClick={startTimer} className="start" value="Start"></input>
    </div>
    )
}
export default Pomodoro;