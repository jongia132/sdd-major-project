import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData } from "@fluentui/react-components"
import React from "react"
import { defaultMethod } from "react-router-dom/dist/dom"
const Tasks = () => {
    // Intial setup
    const [selectedValue, setSelectedValue] = React.useState<TabValue>(JSON.parse(localStorage.getItem("tasks_lastSelected")))
    // Allow global database transaction access
    let db: IDBDatabase, currentList, currentTab: string

    // Avoid type errors
    interface dbTypes {
        group: string
    }

    // Create or verify existance of database
    let [group, setGroup] = React.useState("default")
    let dataStore = indexedDB.open("Tasks")
    dataStore.onerror = e => {
        console.error("Database error")
        return (<p>ERROR</p>)
    }
    dataStore.onupgradeneeded = function () {
        db = dataStore.result
        if (!db.objectStoreNames.contains("default")) {
            let store: IDBObjectStore = db.createObjectStore("default", { keyPath: "id" })
            store.createIndex("name", ["description", "example"])
        }
        console.warn("Database upgraded")
    }
    function ReadTable() {
        dataStore.onsuccess = function () {
            console.info("Database found")
            db = dataStore.result
            currentList = db.transaction("default", "readonly")
            return (
                <p>Success!</p>
            )
        }
    }

    function updateTask() { }

    function addTask() { }

    function deleteTask() { }

    function onTabSelect(e: SelectTabEvent, data: SelectTabData) {
        let parsed = JSON.stringify(data.value)
        setSelectedValue(data.value)
        localStorage.setItem("tasks_lastSelected", parsed)
        console.log(localStorage.getItem("tasks_lastSelected"))
    }

    function load() {

    }

    function resetDatabase() {
        let deletion = indexedDB.deleteDatabase("Tasks")
        deletion.onsuccess = function () { console.warn("Database deleted") }
        deletion.onerror = function () { console.error("Error deleting database") }
    }

    return (
        <div className={`${"content"} ${styles.root}`}>
            <h1>Your tasks</h1>
            <Toolbar className={styles.toolbar} size="small">
                <ToolbarButton appearance="primary">Add task</ToolbarButton>
                <ToolbarButton appearance="subtle" onClick={resetDatabase}>DEBUG ONLY: Reset database</ToolbarButton>
            </Toolbar>
            <Divider appearance="strong" inset />
            <div className={styles.layout}>
                <TabList onTabSelect={onTabSelect} selectedValue={selectedValue} size="large" vertical>
                    <Tab value="default">Tasks</Tab>
                    <Tab value="1">Some other task list</Tab>
                    <Tab value="2">Another task list</Tab>
                </TabList>
                <div className={styles.test}>
                    <span>LMAO</span>
                    <span>LOL</span>
                </div>
                {/* <ReadTable /> */}
            </div>
        </div>
    )
}

function TasksWidget() {
    return (
        <p style={{ color: "black" }}>Tasks Widget</p>
    )
}

export { Tasks, TasksWidget }