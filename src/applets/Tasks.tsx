import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader } from "@fluentui/react-components"
import { openDB } from 'idb'
const Tasks = () => {
    let dataStore = indexedDB.open("Tasks")
    dataStore.onupgradeneeded = e => {
        console.log("upgraded")
    }
    dataStore.onsuccess = e => {
        console.log("already created")
    }
    function TaskTable() {
        return(null)
    }

    return (
        <div className="content">
            <h1>Your tasks</h1>
            <Toolbar size="small">
                <ToolbarButton appearance="primary">+</ToolbarButton>
            </Toolbar>
            {/* <TaskTable /> */}
        </div>
    )
}

function TasksWidget() {
    return (
        <p style={{ color: "black" }}>Tasks Widget</p>
    )
}

export { Tasks, TasksWidget }