import { ListItemIcon } from "@mui/material"
import React, { useState } from 'react'


const ListButton = ({
    children,
    request,
    requestArgs
}: {
    children: React.ReactNode,
    request: Function,
    requestArgs: any
}) => {

    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const handleClick = () => {
        if (!isButtonDisabled) {
            setIsButtonDisabled(true);
            setTimeout(() => {
                setIsButtonDisabled(false);
            }, 2000)
        }
    }
    
    return (
        <ListItemIcon onClick={()=> {!isButtonDisabled && request(requestArgs); handleClick()}}>
            {children}
        </ListItemIcon>
    )
}

ListButton.Icon = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        children
    )
}

export default ListButton