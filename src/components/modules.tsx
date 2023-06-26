import { useNavigate } from "react-router-dom"
import backIcon from "../assets/arrow_back.svg"
import styles from "./modules.module.css"
import { Button, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components"

const BackButton = () => {
    const navigate = useNavigate()
    function goback() {
        navigate(-1)
    }
    return (
        <a onClick={goback} className={styles.backButton} ><img alt="Back button" src={backIcon} height="30px"></img>Back</a>
    )
}


function ContextMenu() {
    return (
        <Menu>
            <MenuTrigger>
                <Button>Toggle menu</Button>
            </MenuTrigger>
            <MenuPopover>
                <MenuList>
                    <MenuItem>Testing!</MenuItem>
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}
export { BackButton, ContextMenu } 