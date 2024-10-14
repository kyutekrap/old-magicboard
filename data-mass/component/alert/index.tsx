'use client'
import { Stack, Typography, Button } from "@mui/material"
import React from 'react'


const Alert = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Stack 
        direction='column' 
        spacing={1}
        justifyContent='space-between'
        alignItems='center'
        >{children}</Stack>
    )
}

Alert.Title = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Typography variant='h6'>
            {children}
        </Typography>
    )
}

Alert.Subtitle = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Typography variant='subtitle1'>
            {children}
        </Typography>
    )
}

Alert.Icon = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        children
    )
}

Alert.Button = ({
    children,
    type,
    callBack
}: {
    children: React.ReactNode,
    type: 'error' | 'success',
    callBack: any
}) => {
    return (
        <div style={{marginTop: '17px', width: '100%'}}>
            <Button variant='outlined' onClick={callBack} fullWidth color={type} >
                <Typography variant='body2'>
                    {children}
                </Typography>
            </Button>
        </div>
    )
}

export default Alert
