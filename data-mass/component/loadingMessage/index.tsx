import React from 'react'
import { Container, Typography, Stack } from '@mui/material'


const LoadingMessage = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Container maxWidth='xs'>
            <Stack
            justifyContent='center'
            alignItems='center'
            style={{ margin: 20, padding: 20, borderStyle: 'dashed', borderWidth: 1 }}
            spacing={2}
            >{children}
            </Stack>
        </Container>
    )
}

LoadingMessage.Title = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Typography variant="body1" paragraph>{children}</Typography>
    )
}

LoadingMessage.Subtitle = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <Typography variant="body2" paragraph>{children}</Typography>
    )
}

export default LoadingMessage
