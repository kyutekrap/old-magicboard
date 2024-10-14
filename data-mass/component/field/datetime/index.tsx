import { Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { connect } from "react-redux"
import * as tp from '@/types'
import * as mt from '@/method'

const DateTime = ({
    type,
    label,
    onChange,
    defaultValue,
    disabled,
    dateType,

    customStrings
}: {
    type: 'fieldset' | 'field',
    label?: string,
    onChange: any,
    defaultValue: string,
    disabled?: boolean,
    dateType: 'datetime-local' | 'date',

    customStrings: Record<string, string>
}) => {

    // Theme
    const theme = useTheme()

    return (
        type === 'fieldset' ? (
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
                <Typography variant='subtitle2' flex={1}>{mt.getString(label ?? '', customStrings)}</Typography>
                <input 
                onChange={onChange}
                defaultValue={defaultValue}
                type={dateType}
                disabled={disabled ?? false}
                style={{
                    flex: 2,
                    width: 'calc(100% - 6px)',
                    padding: '3px',
                    fontSize: '0.9rem',
                    borderRadius: '3px',
                    outline: 'none',
                    borderWidth: '1px',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
                }} />
            </Stack>
        ): type === 'field' ? (
            <input 
            onChange={onChange}
            defaultValue={defaultValue}
            type={dateType}
            style={{
                padding: '3px',
                width: 'calc(100% - 6px)',
                borderRadius: '3px',
                fontSize: '0.9rem',
                outline: 'none',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} />
        ): null
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DateTime)
