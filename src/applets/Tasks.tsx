import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader, TabList, Tab } from "@fluentui/react-components"
import { openDB } from 'idb'
import React from "react"
const Tasks = () => {
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
            let store:IDBObjectStore = db.createObjectStore("default", { keyPath: "id" })
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

    function test() { console.log({ currentTab }) }

    function resetDatabase() {
        let deletion = window.indexedDB.deleteDatabase("Tasks")
        deletion.onsuccess = function() {console.warn("Database deleted")}
        deletion.onerror = function() {console.error("Error deleting database")}
    }

    return (
        <div className={`${"content"} ${styles.container}`}>
            <h1>Your tasks</h1>
            <Toolbar size="small">
                <ToolbarButton appearance="primary">Add task</ToolbarButton>
                <ToolbarButton appearance="subtle" onClick={resetDatabase}>DEBUG ONLY: Reset database</ToolbarButton>
            </Toolbar>
            <TabList onTabSelect={test} defaultSelectedValue={"default"} size="large">
                <Tab value="default">Tasks</Tab>
                <Tab value="lol">TT</Tab>
            </TabList>
            <ReadTable />
        </div>
    )
}

function TasksWidget() {
    return (
        <p style={{ color: "black" }}>Tasks Widget</p>
    )
}

export { Tasks, TasksWidget }