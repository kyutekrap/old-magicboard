'use client'
import React, { useState } from 'react'
import { TextField, Button, Stack, Typography, Link, Checkbox } from '@mui/material'
import * as sv from '@/service'
import SnackBar from '@/component/snackbar'
import { connect } from 'react-redux'
import * as tp from '@/types'
import { setCustomStrings, setGuestStrings, setName, setPages, setRoles, setModules, setSnackbar } from '@/redux/actions'
import { lightBlue } from '@mui/material/colors'
import { setSession } from '@/storage'
import * as mt from '@/method'
import HttpButton from '@/component/httpButton'


const Login = ({
    setState,

    guestStrings,
    errorStrings,
    setSnackbar,
    setModules,
    setRoles,
    setPages,
    setCustomStrings,
    setName
}: {
    setState: any,

    guestStrings: Record<string, string>,
    errorStrings: Record<string, string>,
    setSnackbar: Function,
    setModules: Function,
    setRoles: Function,
    setPages: Function,
    setCustomStrings: Function,
    setName: Function
}) => {

    // Payload
    const [payload, setPayload] = useState<tp.LoginPost>({
        username: '',
        password: '',
        workspace: '',
        remember: false
    })

    // HTTP Request
    const loginHandler = () => {
        if (!mt.validateString(payload.username) || !mt.validateString(payload.password)) return
        sv.LoginService(payload, setSnackbar, errorStrings)
        .then((response: tp.LoginGet) => {
            if (response !== null) {
                setModules(response.modules)
                setRoles(response.roles)
                setPages(response.pages)
                setCustomStrings(response.customStrings)
                setName(response.name)
                setSession('API_KEY', response.access)
                window.location.href = '/dashboard'
            }
        })
    }

    return (
        <>
            <SnackBar />
            <Typography variant='h6' style={{textAlign: 'center'}}><b>{guestStrings["loginToTeam"]}</b></Typography>
            <br/>
            <TextField label={guestStrings["organization"]} variant="outlined"
            fullWidth size='small' onChange={mt.inputHandler(setPayload, 'workspace')} />
            <TextField label={guestStrings["email"]} variant="outlined"
            fullWidth size='small' onChange={mt.inputHandler(setPayload, 'username')} />
            <TextField type='password' label={guestStrings["password"]} variant="outlined"
            fullWidth size='small' onChange={mt.inputHandler(setPayload, 'password')} />
            <HttpButton variant='contained' width='100%' request={loginHandler} size='large'>
                {guestStrings["login"]}
            </HttpButton>
            <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            >
            <Stack
            direction='row'
            alignItems='center'
            >
                <Checkbox onChange={mt.inputHandler(setPayload, 'remember')} />
                <Typography variant='body2'>{guestStrings["rememberMe"]}</Typography>
            </Stack>
            <Link style={{textAlign: 'right', cursor: 'pointer'}} onClick={() => setState('recover')} color='text.secondary' >
                <Typography variant='body2'>{guestStrings["forgot"]}</Typography>
            </Link>
            </Stack>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    snackbar: state.snackbar,
    guestStrings: state.guestStrings,
    errorStrings: state.errorStrings
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setGuestStrings: (payload: Record<string, string>) => dispatch(setGuestStrings(payload)),
    setModules: (payload: tp.Modules[]) => dispatch(setModules(payload)),
    setRoles: (payload: tp.Roles) => dispatch(setRoles(payload)),
    setPages: (payload: tp.Pages[]) => dispatch(setPages(payload)),
    setCustomStrings: (payload: Record<string, string>) => dispatch(setCustomStrings(payload)),
    setName: (payload: string) => dispatch(setName(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
