import backIcon from "../assets/arrow_back.svg"
const backButton = () => {

    return(
        <span style={{
            fontSize: "25px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            cursor: "pointer"
            }} ><img src={backIcon} height="40px"></img>Back
        </span>
    )
}
export default backButton