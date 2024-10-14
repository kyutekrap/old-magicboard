import { Button } from "@mui/material"
import { useState } from "react"
import React from 'react'


const HttpButton = ({
    children,
    size,
    width,
    request,
    variant,
    bgColor,
    marginTop,
    marginBottom
}: {
    children: React.ReactNode,
    variant?: 'outlined' | 'contained' | 'text',
    size?: "small" | "medium" | "large",
    width?: string,
    request: Function,
    bgColor?: string,
    marginTop?: string,
    marginBottom?: string
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
        <Button style={{width: width, background: bgColor, marginTop: marginTop, marginBottom: marginBottom}} size={size}
            onClick={()=> {request(); handleClick()}} disabled={isButtonDisabled}
            variant={variant} >
            {children}
        </Button>
    )
}

export default HttpButton
