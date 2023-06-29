import styles from './settings.module.css'
import { BackButton } from './modules'
import { Button, Card, CardFooter, CardPreview, Checkbox, Input, Label, SelectTabData, SelectTabEvent, Tab, TabList, TabValue, Title2 } from '@fluentui/react-components'
import React, { useState } from 'react'
// Pages
const settings = () => {
    // Load current selected category
    const [selectedValue, setSelectedValue] = React.useState<TabValue>("general")
    function onTabSelect(e: SelectTabEvent, data: SelectTabData) {
        setSelectedValue(data.value)
    }

    // Setting component
    function Settings ({ setting, name, type }: { setting: string, name: string, type: "number" | "search" | "time" | "text" | "email" | "password" | "tel" | "url" | "date" | "datetime-local" | "month" | "week" }) {
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

    // Construct setting categories
    function General() {
        return (
            <section id="general">
                <h1>General</h1>
                <p>General</p>
            </section>
        )
    }

    function Appearance() {
        return (
            <section id="appearance">
                <h1>Appearance</h1>
                <img src="/icons/wallpaper_FILL0_wght300_GRAD0_opsz48.svg" draggable='false' /><p>Background</p>
                <Card>
                    <CardPreview><img src='../assets/Yum.jpg'/></CardPreview>
                    <CardFooter>Default</CardFooter>
                </Card>
            </section>
        )
    }

    function Applet() {
        return (
            <section id="applet">
                <h1>Applet settings</h1>
                <Title2>Tasks</Title2>
                <p>UH OG</p>
                <Settings name='Show description' setting='tasks.description' type="text" />
                <Settings name='Show date' setting='tasks.date' type="text"/>
                <Title2>Pomodoro</Title2>
                <Settings name='Preset 1 Name' setting='timer.p1_name' type='text' />
                <Settings name='Preset 1 Time' setting='timer.p1_time' type="number" />
            </section>
        )
    }

    function Profile() {
        return (
            <section id="profile">
                <h1>Profile</h1>
                <Settings setting="user.name" name='Name' type={"text"}/>
            </section>
        )
    }

    function About() {
        return (
            <section id="about">
                <h1>About</h1>
                <Title2>Application info</Title2>
                <p>The Sydney Technical High School student organiser.</p>
                <p>Version: <code>1.0</code></p>
                <Title2>Reset Application</Title2>
                <p><Button onClick={() => localStorage.clear()}>Delete all app data</Button></p>
                <Title2>Client information</Title2>
                <p>{navigator.userAgent}</p>
                <p>React version {React.version}</p>
            </section>
        )
    }

    // Render page
    return (
        <div className={`${styles.html} prevent-select`}>
            <nav className={styles.settingsMenu}>
                <BackButton />
                <h1 className={styles.section_header}>Settings</h1>
                <TabList vertical defaultSelectedValue={"general"} onTabSelect={onTabSelect} size='large'>
                    <Tab value="general">General</Tab>
                    <Tab value="appearance">Appearance</Tab>
                    <Tab value="applet">Applet settings</Tab>
                    <Tab value="profile">Profile</Tab>
                    <Tab value="about">About</Tab>
                </TabList>
            </nav>
            <div className={`${styles.prefPane} ${"content"}`}>
                <div>
                    {selectedValue === "general" && <General />}
                    {selectedValue === "appearance" && <Appearance />}
                    {selectedValue === "applet" && <Applet />}
                    {selectedValue === "profile" && <Profile />}
                    {selectedValue === "about" && <About />}
                </div>
            </div>
        </div>
    )
}

export default settings