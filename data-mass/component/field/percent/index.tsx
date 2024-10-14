import { Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { connect } from "react-redux"
import * as tp from '@/types'
import { useState } from "react"
import * as mt from '@/method'


const Percent = ({
    type,
    label,
    defaultValue,
    format,
    inputFixedHandler,
    setPayload,

    customStrings
}: {
    type: 'fieldset' | 'field',
    label?: string,
    defaultValue: string,
    format: string,
    inputFixedHandler: Function,
    setPayload: Function,

    customStrings: Record<string, string>
}) => {

    // Theme
    const theme = useTheme()

    // Maximum decimal places
    const [deciLen] = useState(parseInt(format.split('.')[1]))

    // Maximum number
    const [max] = useState(100)

    // Validate 
    const formatNumber = (input: string) => {
        // Remove non-numeric characters except decimal point
        input = input.replace(/[^\d.]/g, '');
    
        // Format number with commas
        let parts = input.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        input = parts.join('.');
    
        // Check for maximum value
        if (parseFloat(input) > max) {
            input = max.toFixed(deciLen)
        }
    
        // Check for number of decimals
        const decimalIndex = input.indexOf('.');
        if (decimalIndex !== -1 && input.substring(decimalIndex + 1).length > deciLen) {
            input = parseFloat(input).toFixed(deciLen);
        }

        // Set payload
        inputFixedHandler(setPayload, label, input)
    }

    return (
        type === 'fieldset' ? (
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
                <Typography variant='subtitle2' flex={1}>{mt.getString(label ?? '', customStrings)} (%)</Typography>
                <input 
                onChange={(event) => formatNumber(event.target.value)}
                value={defaultValue}
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
            onChange={(event) => formatNumber(event.target.value)}
            value={defaultValue}
            style={{
                padding: '3px',
                width: 'calc(100% - 6px)',
                fontSize: '0.9rem',
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

export default connect(mapStateToProps, mapDispatchToProps)(Percent)
