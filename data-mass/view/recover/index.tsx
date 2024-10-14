'use client'
import React, { useState, useEffect } from 'react'
import { Typography, TextField, Divider, Button } from '@mui/material'
import Icon from '@mdi/react'
import { mdiClockTimeEightOutline } from '@mdi/js'
import * as sv from '@/service'
import SnackBar from '@/component/snackbar'
import { connect } from 'react-redux'
import * as tp from '@/types'
import * as mt from '@/method'
import { setSnackbar, setLanguage, setGuestStrings } from '@/redux/actions'
import { lightBlue } from '@mui/material/colors'


const Recover = ({
    setState,
    guestStrings,
    language,
    errorStrings
}: {
    setState: Function,
    guestStrings: Record<string, string>,
    language: string,
    errorStrings: Record<string, string>
}) => {

    // Clock
    const [btnText, setBtnText] = useState<string>(guestStrings["sendLink"])
    const [timeInSeconds, setTimeInSeconds] = useState(0)
    useEffect(() => {
        const updateTimer = () => {
            setTimeInSeconds((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1
                } else {
                    clearInterval(timerInterval)
                    setBtnText(guestStrings["sendLink"])
                    return 0
                }
            })
        }
        const timerInterval = setInterval(updateTimer, 1000)
        return () => clearInterval(timerInterval)
    }, [])
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }

    // HTTP
    const [payload, setPayload] = useState<tp.RecoverPost>({
        'email': '',
        'organization': '',
        'language': ''
    })
    const sendButton = () => {
        mt.inputFixedHandler(setPayload, 'language', language)
        if (!mt.validateForm(payload)) {
            return
        }
        sv.LoginRecoveryService(payload, setSnackbar, errorStrings)
        .then((data) => {
            if (data !== null) {
                setTimeInSeconds(3 * 60)
                setBtnText(guestStrings["mailSent"])
            }
        })
    }

    return (
    <>
        <SnackBar />
        <Typography variant='h6' style={{textAlign: 'center'}}><b>{guestStrings["recover"]}</b></Typography>
        <br/>
        <TextField label={guestStrings["organization"]} variant="outlined"
            fullWidth size='small' onChange={mt.inputHandler(setPayload, 'organization')} />
        <TextField  label={guestStrings["email"]} variant="outlined"
            fullWidth size='small' onChange={mt.inputHandler(setPayload, 'email')} />
        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 40}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Icon
            path={mdiClockTimeEightOutline}
            size={0.7}
            />
            <Typography variant='body2' style={{marginLeft: 5}}>
                {guestStrings["untilNext"]}
            </Typography>
        </div>
            <Typography variant='body2'>{formatTime(timeInSeconds)}</Typography>
        </div>
        <Divider />
        { btnText === guestStrings["sendLink"] ? (
            <Button variant="contained" fullWidth style={{ height: '42px', background: lightBlue[700] }}
            onClick={() => sendButton()} >
                {btnText}
            </Button>
        ) : (
            <Button variant='outlined' fullWidth>
                {btnText}
            </Button>
        )}
        <Button variant='outlined' fullWidth style={{ marginBottom: 20}} onClick={() => setState('login')}>
            {guestStrings["login"]}
        </Button>
    </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    snackbar: state.snackbar,
    guestStrings: state.guestStrings,
    language: state.language,
    errorStrings: state.errorStrings
})

const mapDispatchToProps = {
    setSnackbar,
    setGuestStrings,
    setLanguage
}

export default connect(mapStateToProps, mapDispatchToProps)(Recover)
