'use client'
import React, { useState, useEffect } from 'react'
import { TextField, Typography, Stack, Divider, Button, Select, MenuItem, Checkbox, Container } from '@mui/material'
import * as sv from '@/service'
import * as tp from '@/types'
import SnackBar from '@/component/snackbar'
import LoadingList from '@/component/loadinglist'
import { removeAllSessions } from '@/storage'
import { connect } from 'react-redux'
import { setSnackbar, setLanguage, setCustomStrings } from '@/redux/actions'
import * as mt from '@/method'
import * as md from '@/metadata'
import LoadingMessage from '@/component/loadingMessage'

const Settings = ({
    errorStrings,
    commonStrings,
    modules,
    roles,
    customStrings,
    setCustomStrings,
    setLanguage,
    setSnackbar
}: {
    errorStrings: Record<string, string>,
    commonStrings: Record<string, string>,
    modules: tp.Modules[],
    roles: tp.Roles,
    customStrings: Record<string, string>,
    setCustomStrings: Function,
    setLanguage: Function,
    setSnackbar: Function
}) => {

    // Status Flag
    const [flag, setFlag] = useState<tp.Loader>('LOADING')

    // User info
    const [userInfo, setUserInfo] = useState<tp.SettingsIndexGet>({
        'resultCd': false,
        'resultMsg': '',
        'name': '',
        'email': '',
        'profile': '',
        'language': ''
    })

    // Get user info
    useEffect(() => {
        sv.SettingsMainService({}, setSnackbar, errorStrings)
        .then((response: tp.SettingsIndexGet) => {
            if (response !== null) {
                setUserInfo(response)
                setPayload({
                    ...payload,
                    language: response.language
                })
                setFlag('SUCCESS')
            } else {
                setFlag('ERROR')
            }
        })
    }, [])

    // Update payload
    const [payload, setPayload] = useState({
        'password': '',
        'language': '',
    })

    // Update password
    const updatePassword = () => {
        const newPassword: tp.SettingsUpdatePasswordPost = {
            'password': payload.password
        }
        if (!mt.validateForm(newPassword)) return
        if (!mt.validatePassword(payload.password)) {
        setSnackbar({
            message: errorStrings["passwordIsWeak"],
            open: true
        })
        return
        }
        sv.SettingsUpdatePassword(newPassword, setSnackbar, errorStrings)
        .then((data: tp.DefaultGet) => {
            if (data !== null) {
            setSnackbar({
                message: commonStrings["updated"],
                open: true
            })
        }
        })
    }

    // Update language
    const updateLanguage = () => {
        const newLang: tp.SettingsUpdateLangPost = {
            'language': payload.language
        }
        if (!mt.validateForm(newLang)) return
        sv.SettingsUpdateLanguage(newLang, setSnackbar, errorStrings)
        .then((data: tp.SettingsUpdateLangGet) => {
            if (data !== null) {
                mt.inputFixedHandler(setUserInfo, 'language', payload.language)
                setSnackbar({
                    message: commonStrings["updated"],
                    open: true
                })
                setLanguage(payload.language)
                setCustomStrings(data.customStrings)
            }
        })
    }

    // Logout Handler
    const logout = () => {
        sv.SettingsLogoutService({}, setSnackbar, errorStrings)
        .then(() => {
            removeAllSessions()
            window.location.href = '/authenticate'
        })
    }
    
    return (
        <>
        <SnackBar />
        <Container
        maxWidth="sm" 
        style={{
            paddingTop: mt.isMobile() ? 70 : 90,
            paddingBottom: 20,
            minHeight: '100vh',
        }} >
        {
            flag === 'SUCCESS' ? (
            <Stack
            direction="column"
            spacing={3}
            >
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["profile"]}</Typography>
                    <TextField variant="outlined" fullWidth size='small' value={mt.getString(roles.profile_name, customStrings)} 
                        disabled={true} />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["modules"]}</Typography>
                    {
                        modules.map((module: tp.Modules) => (
                            <Stack
                            direction='row'
                            alignItems='center'
                            key={module.module_id}
                            >
                            <Checkbox disabled={true} checked />
                            <Typography variant='body2'>{module.module_name}</Typography>
                            </Stack>
                        ))
                    }
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["name"]}</Typography>
                    <TextField variant="outlined" fullWidth size='small' value={userInfo.name} disabled={true} />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["email"]}</Typography>
                    <TextField variant="outlined" fullWidth size='small' value={userInfo.email} disabled={true} />
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["language"]}</Typography>
                    { mt.validateString(userInfo.language) ? (
                        <Select fullWidth size="small" defaultValue={userInfo.language}
                            onChange={mt.selectHandler(setPayload, 'language')}>
                            {
                                Object.entries(md.language).map(([key, value]) => (
                                    key !== 'default' && (
                                        <MenuItem value={key} key={key}>{value}</MenuItem>
                                    )
                                ))
                            }
                        </Select>
                    ) : null }
                    <Divider />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div></div>
                        <div>
                            <Button onClick={() => updateLanguage()}>
                            {commonStrings["save"]}
                            </Button>
                        </div>
                    </div>
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Typography variant='body1'>{commonStrings["password"]}</Typography>
                    <TextField variant="outlined" fullWidth size='small' type='password'
                    inputRef={input => input && mt.validateString(payload.password) && input.focus()} value={payload.password}
                    onChange={mt.inputHandler(setPayload, 'password')} />
                    <Divider />
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div></div>
                        <div>
                            <Button onClick={() => updatePassword()}>
                            {commonStrings["save"]}
                            </Button>
                        </div>
                    </div>
                </Stack>
                <Stack direction='column' spacing={2}>
                    <Button variant='outlined' color="error" onClick={() => logout()}>
                    {commonStrings["logout"]}
                    </Button>
                </Stack>
            </Stack>
            ) : flag === 'ERROR' ? (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <LoadingMessage>
                    <LoadingMessage.Title>{errorStrings["errorWhile"]}</LoadingMessage.Title>
                    <LoadingMessage.Subtitle>{errorStrings["tryReloading"]}</LoadingMessage.Subtitle>
                </LoadingMessage>
            </div>
            ) : (
            <LoadingList />
            )
        }
        </Container>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    errorStrings: state.errorStrings,
    commonStrings: state.commonStrings,
    snackbar: state.snackbar,
    modules: state.modules,
    roles: state.roles,
    customStrings: state.customStrings
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setLanguage: (payload: string) => dispatch(setLanguage(payload)),
    setCustomStrings: (payload: Record<string, string>) => dispatch(setCustomStrings(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
