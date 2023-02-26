import { Link } from "react-router-dom"
import backIcon from "../assets/arrow_back.svg"
const BackButton = () => {
    return(
        <Link to={'/'} style={{
            fontSize: "var(--font-regular)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer"
            }} ><img alt="Back button" src={backIcon} height="30px"></img>Back
        </Link>
    )
}

const primaryButton = (type: number, msg: string) => {
    return(
        <button>Testing</button>
    )
}

export {BackButton, primaryButton} 