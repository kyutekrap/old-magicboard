'use client'
import { connect } from 'react-redux'
import * as tp from '@/types'
import SnackBar from '@/component/snackbar'
import { Button, Divider, TextField, Typography } from '@mui/material'
import * as mt from '@/method'
import { useState } from 'react'
import lightBlue from '@mui/material/colors/lightBlue'
import * as sv from '@/service'
import { setSnackbar } from '@/redux/actions'
import Icon from '@mdi/react'
import { mdiClockTimeEightOutline } from '@mdi/js'


const Reset = ({
    guestStrings,
    setSnackbar,
    errorStrings,

    link
}: {
    guestStrings: Record<string, string>,
    setSnackbar: Function,
    errorStrings: Record<string, string>,

    link: string
}) => {

    // HTTP Payload
    const [payload, setPayload] = useState<tp.ResetPasswordPost>({
        'new_password': '',
        'link': link
    })

    // Clock
    const [timeInSeconds, setTimeInSeconds] = useState(0)
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
    }
    function countdown(seconds: number) {
        if (seconds >= 0) {
            setTimeInSeconds(seconds)
            setTimeout(function() {
                countdown(seconds - 1)
            }, 1000)
        } else {
            window.location.href = '/authenticate'
        }
    }

    // Login button visibility
    const [visible, setVisible] = useState(false)

    // Fire HTTP
    const TriggerResetPasswordService = () => {
        if (!mt.validateString(payload.new_password) || !mt.validateString(payload.link)) return
        sv.ResetPasswordService(payload, setSnackbar, errorStrings)
        .then((response: tp.DefaultGet) => {
            if (response !== null) {
                setSnackbar({
                    "open": true,
                    "message": guestStrings["saved"]
                })
                countdown(5)
                setVisible(true)
            }
        })
    }

    return (
        <>
            <SnackBar />
            <Typography variant='h6' style={{textAlign: 'center'}}><b>{guestStrings["resetPassword"]}</b></Typography>
            <br/>
            <TextField label={guestStrings["newPassword"]} variant="outlined"
                fullWidth size='small' onChange={mt.inputHandler(setPayload, 'new_password')} />
            <Button variant='contained' fullWidth style={{ height: '42px', background: lightBlue[700] }}
                onClick={() => TriggerResetPasswordService()} >
                {guestStrings["resetPassword"]}
            </Button>
            {
                visible && (
                    <>
                    <Divider />
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
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
                    <Button variant='outlined' fullWidth style={{ marginBottom: 20}} onClick={() => window.location.href = '/authenticate'} >
                        {guestStrings["login"]}
                    </Button>
                    </>
                )
            }
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    guestStrings: state.guestStrings,
    errorStrings: state.errorStrings
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Reset)