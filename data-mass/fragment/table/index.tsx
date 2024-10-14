import React, { useEffect, useState } from 'react'
import { Stack, Link, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Typography, TableSortLabel,IconButton } from '@mui/material'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { useTheme } from '@mui/material/styles'
import * as sv from '@/service'
import { connect } from 'react-redux'
import { setInterface, setSnackbar } from '@/redux/actions'
import * as tp from '@/types'
import * as mt from '@/method'
import LoadingMessage from '@/component/loadingMessage'

const TableView = ({
    pageId,
    setIsAccordionExpanded,
    setItem,

    intrface,
    modules,
    roles,
    errorStrings,
    customStrings,
    commonStrings,
    setInterface
}: {
    pageId: string,
    setIsAccordionExpanded: Function,
    setItem: Function,

    intrface: tp.PageItemGet,
    modules: tp.Modules[],
    roles: tp.Roles,
    errorStrings: Record<string, string>,
    customStrings: Record<string, string>,
    commonStrings: Record<string, string>,
    setInterface: Function
}) => {

    // Theme
    const theme = useTheme()

    // Module
    const [module] = useState(modules.find(module => module.activated)?.module_id)

    // Revoke on module missing
    function tryReloading() {
        setSnackbar({
            'open': true,
            'message': errorStrings["tryReloading"]
        })
    }

    // Table Controls
    const [filterCol, setFilterCol] = useState('')
    type Order = 'asc' | 'desc'
    const [sorting, setSorting] = useState<Order>('desc')

    // Refresh Data
    const refreshData = () => {
        if (!mt.validateString(module)) {
            tryReloading()
            return
        }
        const payload: tp.RefreshDataPost = {
            page_id: pageId,
            module_id: module ?? '',
            filterCol: filterCol,
            sorting: sorting == 'asc' ? 1 : -1,
            offset: 0,
            searchSpec: []
        }
        sv.RefreshDataService(payload, setSnackbar, errorStrings)
        .then((response: tp.RefreshDataGet) => {
            if (response !== null) {
                setInterface({
                    ...intrface,
                    data: {
                        ...intrface.data,
                        [payload.page_id]: response.data[payload.page_id]
                    }
                })
            }
        })
    }

    // Paging
    const [rowsPerPage, setRowsPerPage] = useState<number>(15)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [uboundHit, setUboundHit] = useState(false)
    const invokePagingApi = () => {
        if (!mt.validateString(module)) {
            tryReloading()
            return
        }
        const payload: tp.RefreshDataPost = {
            page_id: pageId,
            module_id: module ?? '',
            filterCol: filterCol,
            sorting: sorting == 'asc' ? 1 : -1,
            offset: rowsPerPage * currentPage - 1,
            searchSpec: []
        }
        if (mt.validateString(payload.filterCol)) {
            sv.RefreshDataService(payload, setSnackbar, errorStrings)
            .then((data: tp.RefreshDataGet) => {
                if (data !== null) {
                    if (data.data[payload.page_id].length === 0) setUboundHit(true)
                    else {
                        const updatedInterface = { ...intrface }
                        updatedInterface.data[payload.page_id].concat(data.data[payload.page_id])
                        setInterface(updatedInterface)
                    }
                }
            })
        } else {
            const payload: tp.PageItemPost = {
                page_id: pageId,
                module_id: module ?? '',
                offset: rowsPerPage * currentPage - 1
            }
            sv.PageItemService(payload, setSnackbar, errorStrings)
            .then((data: tp.PageItemGet) => {
                if (data !== null) {
                    if (data.data[payload.page_id].length === 0) setUboundHit(true)
                    else {
                        const updatedInterface = { ...intrface }
                        updatedInterface.data[payload.page_id].concat(data.data[payload.page_id])
                        setInterface(updatedInterface)
                    }
                }
            })
        }
    }

    // Sorting by column
    const handleSorting = (key: string) => {
        if (filterCol !== key) {
            setSorting('desc')
            setFilterCol(key)
        } else {
            setSorting(sorting === 'asc' ? 'desc' : 'asc')
        }
    }

    // Refetch data on sorting, filterCol change
    useEffect(() => {
        refreshData()
    }, [sorting, filterCol])

    return (
        <>
        <TableContainer
        sx={{
            borderRadius: 1,
            marginTop: 1,
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)',
            overflow: 'auto'
        }}
        >
        <Table stickyHeader>
        <TableHead>
        <TableRow>
        {
            intrface.keys[pageId].filter((key: tp.Keys) => key.visibility).map((key: tp.Keys, index: number) => (
                <TableCell key={index}>
                <TableSortLabel
                active={filterCol === key.name}
                onClick={() => handleSorting(key.name)}
                direction={sorting}
                >
                {mt.getString(key.name, customStrings)}
                </TableSortLabel>
                </TableCell>
            ))
        }
        </TableRow>
        </TableHead>
        <TableBody>
        {
        intrface.data &&
        intrface.data[pageId] &&
        intrface.data[pageId].map((row: Record<string, any>, index: number) => {
            if (rowsPerPage * (currentPage - 1) <= index && index < rowsPerPage * currentPage) {
                return (
                <TableRow key={index}>
                {
                    intrface.keys &&
                    intrface.keys[pageId] &&
                    intrface.keys[pageId].filter((key: tp.Keys) => key.visibility).map((key: tp.Keys, index: number) => (
                        <TableCell key={index}>
                        {
                        key.type === 'Date & Time' ? (
                            mt.convertTimestamp(row[key.name])
                        ) : key.type === 'Date' ? (
                            mt.convertTimestamp(row[key.name], 'date')
                        ) : key.type === 'True/False' ? (
                            row[key.name] ? mt.getString(row[key.name], commonStrings) : commonStrings["false"]
                        ) : key.type === 'Reference' ? (
                            mt.validateRole(roles, "read", key.reference?._id) ? (
                                <Link
                                color='inherit'
                                style={{cursor: 'pointer'}}
                                onClick={() => window.location.href = '/dashboard?id=' + key.reference?._id + '&item=' + row[key.name]?._id}>
                                {mt.trimString(row[key.name] ? row[key.name]?.name : '')}
                                </Link>
                            ): (
                                mt.trimString(row[key.name] ? row[key.name]?.name : '')
                            )
                        ) : key.type === 'URL' ? (
                            <Link
                            color='inherit'
                            onClick={() => window.open(row[key.name], '_blank')?.focus()}
                            style={{ cursor: 'pointer' }}
                            >
                                {row[key.name]}
                            </Link>
                        ) : key.type === 'List' ? (
                            mt.trimString(mt.joinList(row[key.name]))
                        ) : key.type === 'Conditions' ? (
                            mt.trimString(mt.stringifySearchSpec(row[key.name]))
                        ) : (
                            key.api_key === 'name' ? (
                                <Link style={{cursor: 'pointer'}} onClick={() => {
                                    setIsAccordionExpanded(true)
                                    setItem(row)
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}>
                                    {mt.trimString(row[key.name])}
                                </Link>
                            ): (
                                mt.trimString(row[key.name] || '')
                            )
                        )
                        }
                        </TableCell>
                    ))
                }
                </TableRow>
                );
            } else {
                if (rowsPerPage * (currentPage - 1) <= index && index < rowsPerPage * currentPage
                && index === intrface.data[pageId].length - 1 && !uboundHit) {
                    invokePagingApi()
                }
                return null
            }
        })}
        </TableBody>
        </Table>
        {
            intrface.data[pageId].length === 0 && (
                <LoadingMessage>
                    <LoadingMessage.Title>{errorStrings["noData"]}</LoadingMessage.Title>
                    <LoadingMessage.Subtitle>{errorStrings["noData2"]}</LoadingMessage.Subtitle>
                </LoadingMessage>
            )
        }
        </TableContainer>
        <Stack
        direction='row'
        alignItems='center'
        padding='10px 3px 0px 3px'
        justifyContent='space-between'
        >
        <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        flex={1}
        >
        <span style={{fontSize: '12px'}}>{commonStrings["rowsPerPage"]}</span>
        <select style={{outline: 'none', cursor: 'pointer', fontSize: '12px'}}
            defaultValue={rowsPerPage}
            onChange={(event) => setRowsPerPage(parseInt(event.target.value))}>
            <option value={5}>5</option>
            <option value={15}>15</option>
            <option value={30}>30</option>
        </select>
        </Stack>
        <Stack
        direction='row'
        alignItems='center'
        spacing={1}
        >
        {
            currentPage !== 1 && (
            <IconButton size='small' onClick={() => setCurrentPage(currentPage - 1)}>
                <Icon path={mdiChevronLeft} size={0.8} />
            </IconButton>
            )
        }
        <Typography variant='subtitle2'>{currentPage}</Typography>
        { 
            intrface.data &&
            intrface.data[pageId] &&
            (
                rowsPerPage * currentPage <= intrface.data[pageId].length ||
                intrface.data[pageId].length % 200 == 0
            ) && (
                intrface.data[pageId].length > 0 && (
                    <IconButton size='small' onClick={() => setCurrentPage(currentPage + 1)}>
                        <Icon path={mdiChevronRight} size={0.8} />
                    </IconButton>
                )
            )
        }
        </Stack>
        </Stack>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    modules: state.modules,
    roles: state.roles,
    errorStrings: state.errorStrings,
    customStrings: state.customStrings,
    pages: state.pages,
    commonStrings: state.commonStrings,
    intrface: state.intrface
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableView)
