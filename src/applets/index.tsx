import { Display, Title1 } from "@fluentui/react-components";
import styles from "./index.module.css"
import { PomodoroWidget } from "./Pomodoro";
import { TasksWidget } from "./Tasks";
import { useEffect, useState } from "react";
const Index = () => {
    // Retrieve user details
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

    // Live update to current time
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // function QuoteDisplay() {
    //     const [quote, setQuote] = useState('');
    //     const [quoteLoaded, setQuoteLoaded] = useState(false);

    //     useEffect(() => {
    //       if (!quoteLoaded) {
    //         const fetchQuote = async () => {
    //           try {
    //             const response = await fetch('https://api.quotable.io/random');
    //             const data = await response.json();
    //             const formattedQuote = `"${data.content}" - ${data.author}`;
    //             setQuote(formattedQuote);
    //             setQuoteLoaded(true);
    //           } catch (error) {
    //             console.error('Error fetching quote:', error);
    //           }
    //         };
      
    //         fetchQuote();
    //       }
    //     }, [quoteLoaded]);

    //     return (
    //         <p>{quote}</p>
    //     );
    // };

    return (
        <div className={`${styles.root} ${"content"}`}>
            <main className={styles.container}>
                <h1 className={styles.greeting}>
                    <Greeting />, {user.name}.
                </h1>
                <div className={styles.hero}>
                    <div>
                        <p className={styles.time}>{formattedTime}</p>
                        <p className={styles.date}>{new Date().toLocaleString(undefined, { weekday: 'long' })}</p>
                        {/* <QuoteDisplay /> */}
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