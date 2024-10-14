'use client'
import { Fab, Typography } from "@mui/material"
import React from 'react'


const CustomFab = ({
    children,
    buttonAction
}: {
    children: React.ReactNode,
    buttonAction: Function
}) => {
    return (
        <Fab variant='extended' color='info' onClick={() => buttonAction()}>
            {children}
        </Fab>
    )
}

CustomFab.Title = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Typography variant='body2'>
            {children}
        </Typography>
    )
}

export default CustomFab
