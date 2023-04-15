import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader, TabList, Tab } from "@fluentui/react-components"
import { openDB } from 'idb'
import React from "react"
const Tasks = () => {
    // Allow global database transaction access
    let db, currentList, currentTab:string

    // Avoid type errors
    interface dbTypes {
        group: string
    }
    // Create or verify existance of database
    let dataStore = indexedDB.open("Tasks")
    let [group, setGroup] = React.useState("default")
    function ReadTable() {
        dataStore.onupgradeneeded = function() {
            console.log("upgraded")
        }
        dataStore.onsuccess = function() {
            console.log("Database found")
            db = dataStore.result
            if (!db.objectStoreNames.contains("default")) {
                db.createObjectStore("default")
            }
            currentList = db.transaction([group], "readonly").objectStore("default")
        }
        return(
            null
        )
    }

    function updateTask() {}

    function addTask() {}

    function deleteTask() {}

    function test() {console.log({currentTab})}

    return (
        <div className="content">
            <h1>Your tasks</h1>
            <Toolbar size="small">
                <ToolbarButton appearance="primary">Add task</ToolbarButton>
            </Toolbar>
            <TabList onTabSelect={test} defaultSelectedValue={"default"} size="large">
                <Tab value="default">Tasks</Tab>
                <Tab value="lol">TT</Tab>
            </TabList>
            <ReadTable/>
        </div>
    )
}

function TasksWidget() {
    return (
        <p style={{ color: "black" }}>Tasks Widget</p>
    )
}

export { Tasks, TasksWidget }