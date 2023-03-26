import styles from "./Tasks.module.css"
import {openDB} from 'idb'
const Tasks = () => {
    function TaskTable() {
        return <p>tes</p>
    }

    return(
        <div className="content">
            <h1>Your tasks</h1>
            <TaskTable />
        </div>
    )
}

function TasksWidget(){
    return(
        <p style={{color: "black"}}>Tasks Widget</p>
    )
}

export {Tasks, TasksWidget}