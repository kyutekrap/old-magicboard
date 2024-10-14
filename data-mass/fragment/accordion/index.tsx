import React from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import { connect } from 'react-redux'
import Icon from '@mdi/react'
import { mdiMenuDown } from '@mdi/js'
import Form from '@/fragment/form'
import { useTheme } from '@mui/material/styles'
import * as tp from '@/types'
import * as mt from '@/method'

const AccordionView = ({
    page_id,
    isAccordionExpanded,
    setIsAccordionExpanded,
    item,
    setItem,
    keys,
    flows,
    setRecords,

    customStrings,
    pages
}: {
    page_id: string,
    isAccordionExpanded: boolean,
    setIsAccordionExpanded: Function,
    item: Record<string, any>,
    setItem: Function,
    keys: tp.Keys[],
    flows: tp.Flow[],
    setRecords?: Function,

    customStrings: Record<string, string>,
    pages: tp.Pages[]
}) => {

    // Theme
    const theme = useTheme()

    // Wipe data
    const wipeData = () => {
        if (isAccordionExpanded) {
            mt.inputFixedHandler(setItem, "_id", "")
        }
        setIsAccordionExpanded(!isAccordionExpanded)
    }

    return (
        <div id={page_id}>
            <Accordion
            sx={{
                borderRadius: 5,
                marginBottom: 0,
                marginTop: 0,
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }}
            expanded={isAccordionExpanded} 
            onChange={() => wipeData()}
            elevation={0}
            >
                <AccordionSummary expandIcon={<Icon path={mdiMenuDown} size={1} />}>
                    <Typography>{mt.getTitle(page_id, pages, customStrings)}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Form
                    page_id={page_id}
                    payload={item}
                    setPayload={setItem}
                    type='list'
                    keys={keys}
                    flows={flows}
                    setRecords={setRecords}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    pages: state.pages
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AccordionView)
