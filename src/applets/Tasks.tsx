import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData, Spinner, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Button, ComboboxProps, ToolbarDivider } from "@fluentui/react-components"
import { Alert } from '@fluentui/react-components/unstable';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { openDB, deleteDB, IDBPDatabase } from "idb"
import React, { FormEvent, ReactElement } from "react"

// Avoid type errors
interface dbTypes {
    task: object
    name: string
    group: string
    date: Date,
    description: string
}

// Create or verify the existance of a database
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

// Add a task to the objectStore
async function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const input = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries())
    await database().then(db => {
        db.add(JSON.stringify(input.group) ?? "default", {
            name: input.name ?? "Unnamed",
            description: input.description ?? undefined,
            date: input.date ?? new Date()
        });
    })
}

// DEBUG ONLY
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
                    {status ? <Alert intent="success">Reset successful.</Alert> : undefined}
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

    // Save current focused group of tasks to storage and switch to it
    async function onTabSelect(event: SelectTabEvent, data: SelectTabData) {
        const value = data.value as string
        setSelectedValue(value)
        // await loadTasks(value)
        localStorage.setItem("tasks.lastSelected", value)
    }

    async function LoadTasks(objectStore: string) {
        let elements: Array<ReactElement> = []
        await (await database()).getAll(objectStore).then(function (objects) {
            for (const cursor of objects) {
                elements.push(<div>{cursor.name}</div>)
            }
        })
        elements.map(function (d) {
            return d;
        })
    }

    // Create the dialogue to make a task
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
                        <DialogContent className={styles.modal}>
                            <Label required>Name</Label>
                            <Input required name="name"></Input>
                            <Label>Description</Label>
                            <Input name="description"></Input>
                            <Label>Due date</Label>
                            <DatePicker name="date" value={new Date()} showCloseButton></DatePicker>
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
                    <span>LMAO</span>
                </div>
                <LoadTasks objectStore={"lol"} />
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

function add(arg0: string, arg1: { name: FormDataEntryValue; description: FormDataEntryValue; group: number; date: FormDataEntryValue; }) {
    throw new Error("Function not implemented.");
}
