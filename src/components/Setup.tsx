import { Button, Input, Label, Title1 } from "@fluentui/react-components";
import { useState } from "react";
import styles from "./Setup.module.css"

export default function Setup() {
    // Setting component
    function Settings({ setting, name, type }: { setting: string, name: string, type: "number" | "search" | "time" | "text" | "email" | "password" | "tel" | "url" | "date" | "datetime-local" | "month" | "week" }) {
        const [value, setValue] = useState(localStorage.getItem(setting) || '');

        const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
            setValue(event.target.value);
        };

        const handleSave = () => {
            localStorage.setItem(setting, value);
        };

        return (
            <div>
                <Label>{name}</Label>
                <Input type={type} value={value} onChange={handleChange} />
                <Button onClick={handleSave}>Save</Button>
            </div>
        );
    };

    return (
        <main className={styles.main}>
            <div className={styles.grid}>
                <h1>Setup Profile</h1>
                <Settings setting="user.name" name='Name' type={"text"} />
                <Settings setting="user.rollCall" name='Roll Call' type={"text"} />
                <Button appearance="primary" size="large" shape="rounded" onClick={() => { localStorage.setItem('setup', "true"); window.location.reload() }}>Complete setup</Button>
            </div>
        </main>
    )
}