import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData, Spinner, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Button, ComboboxProps, ToolbarDivider, Table, TableHeader, TableRow, TableBody, DataGridCell, TableHeaderCell, DataGridRow, DataGrid, DataGridHeader, DataGridHeaderCell } from "@fluentui/react-components"
import { Alert } from '@fluentui/react-components/unstable';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { openDB, deleteDB, IDBPDatabase } from "idb"
import React, { FormEvent, ReactElement, useEffect, useState } from "react"
import { ContextMenu } from "../components/modules";

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

// function handleContext(e: Event) {
//     rightClick(true)
// }

function LoadTasks({ objectStore }: { objectStore: string }) {
    const [array, setArray] = useState([]) as any
    let elements = []
    useEffect(() => {
        async function query() {
            let db = await database()
            await db.getAll(objectStore).then((tasks) => {
                setArray(tasks)
            })
            db.close
        }
        query()
        console.log("LOL")

    }, [localStorage.getItem("tasks.lastSelected")]
    )
    for (const i in array) {
        let parsed = Object.assign({}, array[i])
        elements.push(
            <DataGridRow key={parsed.uid}>
                <DataGridCell>
                    {parsed.name}
                </DataGridCell>
                <DataGridCell>{parsed.description}</DataGridCell>
                <DataGridCell>{parsed.date}</DataGridCell>
            </DataGridRow>
        )
    }
    return (
        // <div className={styles.test}>{elements}</div>
        <TableBody>
            {elements}
        </TableBody>
    )
}

const Tasks = (props: Partial<ComboboxProps>) => {
    // Intial setup
    const [selectedValue, setSelectedValue] = useState<TabValue>(localStorage.getItem("tasks.lastSelected"))

    // Save current focused group of tasks to storage and switch to it
    async function onTabSelect(event: SelectTabEvent, data: SelectTabData) {
        const value = data.value as string
        setSelectedValue(value)
        // await loadTasks(value)
        localStorage.setItem("tasks.lastSelected", value)
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
                <ContextMenu />
            </Toolbar>
            <Divider appearance="strong" inset />
            <div className={styles.layout}>
                <TabList onTabSelect={onTabSelect} selectedValue={selectedValue ? selectedValue : "default"} size="large" vertical>
                    <Tab value="default">Tasks</Tab>
                    <Tab value="1">Some other task list</Tab>
                    <Tab value="2">Another task list</Tab>
                </TabList>
                <DataGrid sortable size="small">
                    <DataGridHeader>
                        <DataGridRow>
                            <DataGridHeaderCell>
                                Name
                            </DataGridHeaderCell>
                            <DataGridHeaderCell>
                                Description
                            </DataGridHeaderCell>
                            <DataGridHeaderCell>
                                Date
                            </DataGridHeaderCell>
                        </DataGridRow>
                    </DataGridHeader>
                    <LoadTasks objectStore={"default"} />
                </DataGrid>
            </div>
        </div>
    )
}

function TasksWidget() {
    return (
        <LoadTasks objectStore="default"/>
    )
}

export { Tasks, TasksWidget }