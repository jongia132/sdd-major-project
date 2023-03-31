import styles from "./Tasks.module.css"
import { Table, TableHeader, TableCell, TableBody, TableRow, TableHeaderCell, Toolbar, ToolbarButton, ProgressBar } from "@fluentui/react-components"
import { openDB } from 'idb'
const Tasks = () => {
    function TaskTable() {
        return <p>tes</p>
    }

    return (
        <div className="content">
            <h1>Your tasks</h1>
            <ProgressBar color="error"/>
            <Toolbar size="small">
                <ToolbarButton appearance="primary">+</ToolbarButton>
            </Toolbar>
            <TaskTable />
            <Table>
                <TableHeader>
                    <TableRow>TEST</TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>TWST</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>WOAH</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

function TasksWidget() {
    return (
        <p style={{ color: "black" }}>Tasks Widget</p>
    )
}

export { Tasks, TasksWidget }