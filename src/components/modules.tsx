import { Link } from "react-router-dom"
import backIcon from "../assets/arrow_back.svg"
import styles from "./modules.module.css"

const BackButton = () => {
    return(
        <Link to={'/'} className={styles.backButton} ><img alt="Back button" src={backIcon} height="30px"></img>Back</Link>
    )
}

export {BackButton} 