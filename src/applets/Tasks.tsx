import styles from "./Tasks.module.css"
import { Toolbar, ToolbarButton, TabList, Tab, TabValue, Divider, SelectTabEvent, SelectTabData, Spinner, Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogContent, Label, Input, DialogActions, Button, ComboboxProps, ToolbarDivider, Table, TableHeader, TableRow, TableBody, TableCell, TableHeaderCell, MenuButton, Menu, MenuTrigger, MenuList, MenuPopover, MenuItem, Checkbox } from "@fluentui/react-components"
import { Alert } from '@fluentui/react-components/unstable';
import { DateFormatting, DatePicker } from "@fluentui/react-datepicker-compat";
import { openDB, deleteDB, IDBPDatabase } from "idb"
import React, { FormEvent, ReactElement, useEffect, useState } from "react"

// Avoid type errors
interface dbTypes {
    task: object
    name: string
    group: string
    date: string,
    description: string,
    uid: IDBKeyRange | any,
    state: boolean
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
                <ToolbarButton appearance="subtle">Clear tasks</ToolbarButton>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Clear Tasks</DialogTitle>
                    {load ? <Alert intent="warning">Waiting for open connections preventing this action. <Spinner></Spinner></Alert> : undefined}
                    {status ? <Alert intent="success">Reset successful.</Alert> : undefined}
                    <DialogContent>
                        Are you sure you want to reset the database?
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

// function ContextMenu(target: any) {
//     return (
//         <Menu>
//             <MenuTrigger>
//                 <MenuButton size="small">hi</MenuButton>
//             </MenuTrigger>
//             <MenuPopover>
//                 <MenuList>
//                     <MenuItem onClick={new Task().delete}>Delete</MenuItem>
//                     <MenuItem>Edit</MenuItem>
//                     <MenuItem onClick={() => console.log(target)}>LOG</MenuItem>
//                     <MenuItem>
//                         {/* <MenuTrigger>
//                                         <MenuButton>Move to group</MenuButton>
//                                     </MenuTrigger>
//                                     <MenuPopover>
//                                         <MenuList>GROUP</MenuList>
//                                     </MenuPopover> */}
//                     </MenuItem>
//                 </MenuList>
//             </MenuPopover>
//         </Menu>
//     )
// }



const Tasks = (props: Partial<ComboboxProps>) => {
    // Intial setup
    // const [selectedValue, setSelectedValue] = useState<TabValue>(localStorage.getItem("tasks.lastSelected"))
    const [refreshState, setRefreshState] = useState(false)

    // Save current focused group of tasks to storage and switch to it
    // async function onTabSelect(event: SelectTabEvent, data: SelectTabData) {
    //     const value = data.value as string
    //     setSelectedValue(value)
    //     // await loadTasks(value)
    //     localStorage.setItem("tasks.lastSelected", value)
    // }

    // Tasks class
    class Task {
        // uid: number
        // name: string
        // date: Date = new Date()

        // Delete Task function
        async delete(target: IDBKeyRange) {
            const db = await database()
            db.delete("default", target)
            db.close
            setRefreshState(!refreshState)
        }

        async stateChange(target: IDBKeyRange) {
            const db = await database()
            const task = await db.get("default", target)
            task.state = !task.state
            db.put("default", task)
            db.close
            setRefreshState(!refreshState)
        }

        // Add a task to the objectStore
        async addTask(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()
            const input = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries())
            await database().then(db => {
                db.add(JSON.stringify(input.group) ?? "default", {
                    name: input.name ?? "Unnamed",
                    description: input.description ?? undefined,
                    date: input.date ?? new Date(),
                    state: false
                });
                db.close
            })
            setRefreshState(!refreshState)
        }

        // Load task based on IDB key
        // async readTask(target: IDBKeyRange) {
        //     const db = await database()
        //     const retrieved = await db.get("default", target)
        //     db.close
        //     return retrieved
        // }

        // Return menu item
        contextMenu(target: IDBKeyRange) {
            return (
                <>
                    <Button onClick={() => this.delete(target)}>Delete</Button>
                </>
            )
        }
    }

    // Load tasks into interface
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
        }, [refreshState]
        )

        // New object mapper
        let parsed = array
        return (
            <>
                {parsed.map((item: dbTypes) => {
                    return (
                        <TableRow key={item.uid} data-key={item.uid}>
                            <TableCell>
                                <Checkbox size="large" checked={item.state} onClick={() => new Task().stateChange(item.uid)}></Checkbox>
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>
                                {new Task().contextMenu(item.uid)}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </>
        )
    }

    // Create the dialogue to make a task
    function AddTaskWindow(target: IDBKeyRange) {
        return (
            <Dialog modalType="modal">
                <DialogTrigger disableButtonEnhancement>
                    <ToolbarButton appearance="primary">Add task</ToolbarButton>
                </DialogTrigger>
                <DialogSurface>
                    <form method="post" onSubmit={new Task().addTask}>
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

    // function EditTaskWindow() {
    //     return (
    //         <Dialog modalType="modal">
    //             <DialogTrigger disableButtonEnhancement>
    //                 <Button>Edit</Button>
    //             </DialogTrigger>
    //             <DialogSurface>
    //                 <form method="post">
    //                     <DialogBody>
    //                         <DialogTitle>Edit Task</DialogTitle>
    //                     </DialogBody>
    //                     <DialogContent className={styles.modal}>
    //                         <Label required>Name</Label>
    //                         <Input required name="name"></Input>
    //                         <Label>Description</Label>
    //                         <Input name="description"></Input>
    //                         <Label>Due date</Label>
    //                         <DatePicker name="date" showCloseButton></DatePicker>
    //                     </DialogContent>
    //                     <DialogActions position="end">
    //                         <DialogTrigger>
    //                             <Button type="reset" appearance="secondary">Cancel</Button>
    //                         </DialogTrigger>
    //                         <Button type="submit" appearance="primary">Confirm</Button>
    //                     </DialogActions>
    //                 </form>
    //             </DialogSurface>
    //         </Dialog>
    //     )
    // }

    return (
        <div className={`${"content"} ${styles.root}`}>
            <h1>Your tasks</h1>
            <Toolbar className={styles.toolbar} size="small">
                <AddTaskWindow lower={undefined} lowerOpen={false} upper={undefined} upperOpen={false} includes={function (key: any): boolean {
                    throw new Error("Function not implemented.");
                } } />
                <ToolbarDivider />
                <ResetDB />
            </Toolbar>
            <Divider appearance="strong" inset />
            <div className={styles.layout}>
                {/* <TabList onTabSelect={onTabSelect} selectedValue={selectedValue ? selectedValue : "default"} size="large" vertical>
                    <h2>Groups</h2>
                    <Tab value="default">Tasks</Tab>
                    <Tab value="1">Some other task list</Tab>
                    <Tab value="2">Another task list</Tab>
                </TabList> */}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderCell style={{ width: 30 }}>
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Name
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Description
                            </TableHeaderCell>
                            <TableHeaderCell>
                                Date
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <LoadTasks objectStore={"default"} />
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

function TasksWidget() {
    return (
        <LoadTasks objectStore="default" />
    )
}

export { Tasks, TasksWidget }