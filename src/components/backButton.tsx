import { Link } from "react-router-dom"
import backIcon from "../assets/arrow_back.svg"
const backButton = () => {

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
export default backButton