'use client'
import React, { useEffect, useState } from 'react'
import * as tp from '@/types'
import { connect } from 'react-redux'
import * as mt from '@/method'
import { Paper, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RelatedList from '@/fragment/relatedList'
import * as sv from '@/service'
import { setInterface, setSnackbar } from '@/redux/actions'
import Form from '@/fragment/form'
import Snackbar from '@/component/snackbar'

const ItemView = ({
    pageId,
    itemId, 

    intrface,
    pages,
    customStrings,
    modules,
    setSnackbar,
    errorStrings,
    setInterface
}: {
    pageId: string,
    itemId: string,

    intrface: tp.PageItemGet,
    pages: tp.Pages[],
    customStrings: Record<string, string>,
    modules: tp.Modules[],
    setSnackbar: Function, 
    errorStrings: Record<string, string>,
    setInterface: Function
}) => {

    // Flag states
    const [flag, setFlag] = useState<tp.Loader>("LOADING")

    // Module
    const [module] = useState(modules.find(module => module.activated)?.module_id)

    // Item
    const [payload, setPayload] = useState<Record<string, any>>({})

    // Theme
    const theme = useTheme()

    // On load
    useEffect(() => {
        if (mt.validateString(module)) {
            const data: tp.NewHeaderItemPost = {
                item_id: itemId,
                module_id: module ?? '',
                page_id: pageId
            }
            if (!mt.validateDict(data)) return
            sv.NewHeaderService(data, setSnackbar, errorStrings)
            .then((response: tp.NewHeaderItemGet) => {
                if (response !== null) {
                    setInterface(response)
                    setPayload(response.header)
                    setFlag("SUCCESS")
                } else setFlag("ERROR")
            })
        } else {
            setSnackbar({
                open: true,
                message: errorStrings["tryReloading"]
            })
        }
    }, [])

    return (
        <>
        <Snackbar />
        <Stack
        direction='column'
        spacing={2}
        paddingTop={mt.isMobile() ? 8.6 : 10}
        paddingLeft={2}
        paddingRight={2}
        paddingBottom={2}
        >
            <Paper
            elevation={0}
            sx={{
            padding: '20px',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }}
            >
                <Typography variant='body1'>{mt.getTitle(pageId, pages, customStrings)}</Typography>
                {
                    intrface.keys[pageId] 
                    && intrface.flows[pageId] 
                    && (
                        <Form
                        payload={payload}
                        setPayload={setPayload}
                        page_id={pageId}
                        type='item'
                        keys={intrface.keys[pageId]}
                        flows={intrface.flows[pageId]}
                        />
                    )
                }
            </Paper>
            {
                flag === 'SUCCESS' && intrface.pages.map((page: tp.RelatedList, idx: number) => 
                    page.visibility &&
                    (
                        <Paper
                        key={idx}
                        elevation={0}
                        sx={{
                            padding: '10px',
                            width: 'calc(100% - 20px)',
                            border: '1px solid',
                            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
                        }}
                        >
                            <RelatedList pageId={page._id} parentId={pageId} />
                        </Paper>
                    )
                )
            }
        </Stack>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    intrface: state.intrface,
    pages: state.pages,
    customStrings: state.customStrings,
    modules: state.modules,
    errorStrings: state.errorStrings
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ItemView)
