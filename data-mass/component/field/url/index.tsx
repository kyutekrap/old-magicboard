import { Stack, Typography, Link } from "@mui/material"
import { connect } from "react-redux"
import * as tp from '@/types'
import * as mt from '@/method'
import { useTheme } from '@mui/material/styles'

const URL = ({
    label,
    value,
    setPayload,
    maxLength,

    customStrings
}: {
    label: string,
    value: string,
    setPayload: Function,
    maxLength: number,

    customStrings: Record<string, string>
}) => {

    // Theme
    const theme = useTheme()

    return (
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
            <Typography variant='subtitle2' flex={1}>
                {mt.getString(label ?? '', customStrings)}
            </Typography>
            <input 
            onChange={mt.inputHandler(setPayload, label)}
            value={value}
            maxLength={maxLength}
            style={{
                flex: 2,
                width: 'calc(100% - 6px)',
                padding: '3px',
                borderRadius: '3px',
                outline: 'none',
                fontSize: '0.9rem',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} />
        </Stack>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(URL)
