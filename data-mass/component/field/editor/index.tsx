import { Backdrop, Container, IconButton, Paper, Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import * as tp from '@/types'
import Icon from "@mdi/react"
import { mdiCloseThick } from "@mdi/js"
import { useState } from "react"
import { connect } from "react-redux"
import LinkEditor from '@/fragment/editor'
import * as mt from '@/method'


const Editor = ({
    payload,
    setPayload,
    label,
    standard,

    customStrings,
    commonStrings
}: {
    payload: string,
    setPayload: Function,
    label: string,
    standard: boolean,

    customStrings: Record<string, string>,
    commonStrings: Record<string, string>
}) => {

    // Theme
    const theme = useTheme()

    // Popup States
    const [popup, setPopup] = useState(false)

    // Set value handler
    const handleSetValue = (value: string) => {
        setPopup(false)
        mt.inputFixedHandler(setPayload, label, value)
    }

    return (
        <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={popup}
        >
        <Container maxWidth='lg'>
        <Paper style={{ padding: 20 }}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                <IconButton onClick={() => setPopup(false)}>
                    <Icon path={mdiCloseThick} size={1} />
                </IconButton>
            </div>
            <LinkEditor
            standard={standard}
            onClick={handleSetValue}
            payload={payload} />
        </Paper>
        </Container>
        </Backdrop>

        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
            <Typography variant='subtitle2' flex={1}>{mt.getString(label ?? '', customStrings)}</Typography>
            <input
            onFocus={() => setPopup(true)}
            value={mt.getString('clickToView', commonStrings)}
            style={{
                padding: '3px',
                borderRadius: '3px',
                outline: 'none',
                fontSize: '0.9rem',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} />
        </Stack>
        </>
    )
}


const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    commonStrings: state.commonStrings
})

const mapDispatchToProps = (_dispatch: any) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
