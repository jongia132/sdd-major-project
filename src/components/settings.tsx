import styles from './settings.module.css'
import { BackButton } from './modules'
import { Button, SelectTabData, SelectTabEvent, Tab, TabList, TabValue } from '@fluentui/react-components'
import React from 'react'
import { Link } from 'react-router-dom'
// Pages
const settings = () => {
    const [selectedValue, setSelectedValue] = React.useState<TabValue>("general")
    function onTabSelect(e: SelectTabEvent, data: SelectTabData) {
        setSelectedValue(data.value)
    }

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
                <p>Appearance</p>
            </section>
        )
    }

    function Applet() {
        return (
            <section id="applet">
                <h1>Applet</h1>
                <p>Applet</p>
            </section>
        )
    }

    function Profile() {
        return (
            <section id="profile">
                <h1>Profile</h1>
                <p>Profile</p>
            </section>
        )
    }

    function About() {
        return (
            <section id="about">
                <h1>Debug</h1>
                <p>{navigator.userAgent}</p>
            </section>
        )
    }

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