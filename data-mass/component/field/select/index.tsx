import { Stack, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { connect } from "react-redux"
import * as tp from '@/types'
import * as mt from '@/method'
import {useEffect, useState} from 'react'


const Select = ({
    label,
    onChange,
    data,
    options,
    setPayload,

    customStrings,
    commonStrings
}: {
    label: string,
    onChange: any,
    data: Record<string, any>,
    options: string[],
    setPayload: Function,

    customStrings: Record<string, string>,
    commonStrings: Record<string, string>
}) => {

    // Theme
    const theme = useTheme()

    // State changes
    const [value, setValue] = useState(
        data[label] ? data[label]?.toString() : options[0].toString()
    )
    useEffect(() => {
        setValue(data[label] ? data[label]?.toString() : options[0].toString())
    }, [data])

    // Set payload on init
    useEffect(() => {
        mt.inputFixedHandler(setPayload, label, value)
    }, [])

    return (
        <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
            <Typography variant='subtitle2' flex={1}>{mt.getString(label ?? '', customStrings)}</Typography>
            <select 
            onChange={onChange}
            value={value}
            style={{
                flex: 2,
                width: 'calc(100% - 6px)',
                fontSize: '0.9rem',
                padding: '3px',
                borderRadius: '3px',
                outline: 'none',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} >
                {
                    options.map((option: any, index: number) => (
                        <option value={option} key={index}>{option}</option>
                    ))
                }
            </select>
        </Stack>
    )
}


const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    commonStrings: state.commonStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Select)
