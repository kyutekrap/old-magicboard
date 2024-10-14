import * as tp from '@/types'
import { Backdrop, Container, IconButton, Paper, Stack, Typography } from '@mui/material'
import { connect } from "react-redux"
import * as mt from '@/method'
import Icon from "@mdi/react"
import { mdiCloseThick, mdiLinkBox } from "@mdi/js"
import { useState } from 'react'
import Multiline from '../multiline'
import Filter from '@/fragment/filter'


const Conditions = ({
    customStrings,

    label,
    maxLength,
    inputFixedHandler,
    setPayload,
    defaultValue,
    page_id
}: {
    customStrings: Record<string, string>,

    label: string,
    maxLength: number,
    inputFixedHandler: Function,
    setPayload: Function,
    defaultValue: tp.SearchSpecification[],
    page_id: string
}) => {

    // Backdrop states
    const [popup, setPopup] = useState(false)

    // Dynamic data
    const [value, setValue] = useState<tp.SearchSpecification[]>(defaultValue)

    // Custom function to sync data
    const customFunction = (value: tp.SearchSpecification[]) => {
        inputFixedHandler(setPayload, label, value)
        setValue(value)
    }

    return (
        <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={popup}
        >
            <Container 
                maxWidth='sm' 
                sx={{ 
                    maxHeight: '90vh',  // 90% of the viewport height
                    overflowY: 'auto',  // Enable vertical scrolling
                    paddingRight: '1rem', // Provide space for the hidden scrollbar
                    '&::-webkit-scrollbar': { display: 'none' },  // Hide scrollbar in WebKit-based browsers
                    '-ms-overflow-style': 'none',  // Hide scrollbar in IE and Edge
                    'scrollbar-width': 'none',  // Hide scrollbar in Firefox
                }}
            >
                <Paper style={{ padding: 20 }}>
                    <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                        <IconButton onClick={() => setPopup(false)}>
                            <Icon path={mdiCloseThick} size={1} />
                        </IconButton>
                    </div>
                    <Filter
                    page_id={page_id}
                    setBackDrop={setPopup}
                    disableRun={true}
                    maxLength={maxLength}
                    customFunction={customFunction}
                    />
                </Paper>
            </Container>
        </Backdrop>
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
        >
            <Stack
                direction='row'
                alignItems='center'
                flex={1}
            >
                <div onClick={() => setPopup(true)} >
                    <Icon
                        path={mdiLinkBox}
                        size={0.9}
                        style={{cursor: 'pointer'}}
                    />
                </div>
                <Typography variant='subtitle2'>
                    {mt.getString(label ?? '', customStrings)}
                </Typography>
            </Stack>
            <Multiline
                type='field'
                defaultValue={mt.stringifySearchSpec(value)}
            />
        </Stack>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Conditions)
