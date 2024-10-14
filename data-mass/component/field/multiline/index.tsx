import { Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { connect } from "react-redux"
import * as tp from '@/types'
import * as mt from '@/method'


const MultiLine = ({
    type,
    label,
    onChange,
    maxLength,
    defaultValue,

    customStrings
}: {
    type: 'fieldset' | 'field',
    label?: string,
    onChange?: any,
    maxLength?: number,
    defaultValue: string,

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
                <textarea
                disabled={onChange === undefined}
                onChange={onChange}
                maxLength={maxLength}
                value={defaultValue}
                cols={4}
                style={{
                    flex: 2,
                    fontSize: '0.9rem',
                    padding: '3px',
                    width: 'calc(100% - 6px)',
                    borderRadius: '3px',
                    outline: 'none',
                    borderWidth: '1px',
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
                }} />
            </Stack>
        ): type === 'field' ? (
            <textarea
            disabled={onChange === undefined}
            onChange={onChange}
            maxLength={maxLength}
            value={defaultValue}
            cols={4}
            style={{
                flex: 2,
                fontSize: '0.9rem',
                padding: '3px',
                width: 'calc(100% - 6px)',
                borderRadius: '3px',
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiLine)
