import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, DataGrid, DataGridHeader, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData, Spinner, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Button, Combobox, ComboboxProps, ToolbarGroup, ToolbarDivider } from "@fluentui/react-components"
import { Alert, InfoButton } from '@fluentui/react-components/unstable';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { openDB, deleteDB , IDBPDatabase } from "idb"
import React from "react"
// Avoid type errors
interface dbTypes {
    name: {
        key: number
        value: string
    },
    group: {
        key: string
        value: number
    },
    date: string,
    description: string
}

// Create or verify existance of database
async function database(): Promise<IDBPDatabase> {
    const db = await openDB("Tasks", 1, {
        upgrade(db) {
            db.createObjectStore("default", {
                keyPath: 'uid',
                autoIncrement: true
            })
        }
    })
    return db
}
async function updateTask() { }

async function addTask(e: { preventDefault: () => void; target: HTMLFormElement | undefined; }) {
    e.preventDefault()
    const input = Object.fromEntries(new FormData(e.target).entries())
    const db = await database()
    db.add("default", {
        name: input.name,
        description: input.description ?? null,
        group: 1,
        date: input.date ?? new Date()
    });
    return
}

async function deleteTask() { }

function ResetDB() {
    const [load, setLoad] = React.useState(false)
    const [status, setStatus] = React.useState(false)
    async function resetDatabase() {
        await deleteDB("Tasks", {
            blocked() {
                setLoad(true);
            }
        })
        setLoad(false)
        setStatus(true)
        return
    }
    return (
        <Dialog modalType="alert">
            <DialogTrigger>
                <ToolbarButton appearance="subtle">DEBUG: Reset database</ToolbarButton>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>RESET DATABASE</DialogTitle>
                    {load ? <Alert intent="warning">Waiting for open connections preventing this action. <Spinner></Spinner></Alert> : undefined}
                    {status ? <Alert intent="success">Reset successful.</Alert> : undefined }
                    <DialogContent>
                        Are you sure you want to reset the default database?
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger>
                            <Button appearance="primary" onClick={() => setStatus(false)} disabled={load}>Cancel</Button>
                        </DialogTrigger>
                        <Button appearance="secondary" onClick={resetDatabase} disabled={load}>RESET</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

const Tasks = (props: Partial<ComboboxProps>) => {
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
                <DialogSurface>
                    <form method="post" onSubmit={addTask}>
                        <DialogBody>
                            <DialogTitle>Add Task</DialogTitle>
                        </DialogBody>
                        <DialogContent>
                            <Label required>Name</Label>
                            <Input required name="name"></Input>
                            <Label>Description</Label>
                            <Input name="description"></Input>
                            <Label>Group</Label>
                            <Label>Date</Label>
                            <DatePicker name="date" value={new Date()} showCloseButton size="large"></DatePicker>
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
                <ToolbarDivider />
                <ResetDB />
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