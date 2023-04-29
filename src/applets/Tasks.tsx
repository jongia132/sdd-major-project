import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData } from "@fluentui/react-components"
import { InfoButton } from '@fluentui/react-components/unstable';
import { openDB, deleteDB, DBSchema } from "idb"
import React from "react"
// Avoid type errors
interface dbTypes extends DBSchema {
    name: {
        key: number
        value: string
    },
    group: {
        key: string
        value: number
    }
}

const db = openDB("Tasks", 1, {
    upgrade(db) {
        db.createObjectStore("default")
    }
})

async function database() {
    // Create or verify existance of database
    function updateTask() { }

    function addTask() { }

    function deleteTask() { }
}

async function resetDatabase() {
    await deleteDB("Tasks", {
        blocked() {alert("There are open connections preventing this action.")}
    })
    alert("Database deleted")
}

const Tasks = () => {
    // Intial setup
    const [selectedValue, setSelectedValue] = React.useState<TabValue>(localStorage.getItem("tasks.lastSelected"))

    function onTabSelect(e: SelectTabEvent, data: SelectTabData) {
        setSelectedValue(data.value)
        localStorage.setItem("tasks.lastSelected", data.value)
    }

    return (
        <div className={`${"content"} ${styles.root}`}>
            <h1>Your tasks</h1>
            <Toolbar className={styles.toolbar} size="small">
                <ToolbarButton appearance="primary">Add task</ToolbarButton>
                <ToolbarButton appearance="primary">Delete</ToolbarButton>
                <ToolbarButton appearance="subtle" onClick={resetDatabase}>DEBUG ONLY: Reset database</ToolbarButton>
                <InfoButton info={<>Welcome to help!</>}></InfoButton>
            </Toolbar>
            <Divider appearance="strong" inset />
            <div className={styles.layout}>
                <TabList onTabSelect={onTabSelect} selectedValue={selectedValue ? selectedValue : "default"} size="large" vertical>
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