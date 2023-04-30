import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, ProgressBar, DataGrid, DataGridHeader, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData, Spinner, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Button } from "@fluentui/react-components"
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

// Create or verify existance of database
const db = openDB("Tasks", 1, {
    upgrade(db) {
        db.createObjectStore("default")
    }
})
async function updateTask() { }

async function addTask(name: string, date: Date, group: number, description: string) {
    await console.log("LOL")
}

async function deleteTask() { }

async function resetDatabase() {
    await deleteDB("Tasks", {
        blocked() { alert("There are open connections preventing this action.") }
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

    function AddTaskWindow() {
        return (
            <Dialog modalType="modal">
                <DialogTrigger disableButtonEnhancement>
                    <ToolbarButton appearance="primary">Add task</ToolbarButton>
                </DialogTrigger>
                <DialogSurface onSubmit={addTask("lol", new Date(), 1, "LOL")}>
                    <form onSubmit={e => e.preventDefault()}>
                        <DialogBody>
                            <DialogTitle>Add Task</DialogTitle>
                        </DialogBody>
                        <DialogContent>
                            <Label required>Name</Label>
                            <Input required></Input>
                            <Label>Description</Label>
                            <Input></Input>
                        </DialogContent>
                        <DialogActions position="end">
                            <DialogTrigger>
                                <Button type="reset" appearance="secondary">Cancel</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary">Add</Button>
                        </DialogActions>
                    </form>
                </DialogSurface>
            </Dialog>
        )
    }

    return (
        <div className={`${"content"} ${styles.root}`}>
            <h1>Your tasks</h1>
            <Toolbar className={styles.toolbar} size="small">
                <AddTaskWindow />
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
                    <Spinner appearance="inverted" label={"Loading tasks"} size="extra-large"></Spinner>
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