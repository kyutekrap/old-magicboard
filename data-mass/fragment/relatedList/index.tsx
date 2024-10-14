import React, { useEffect, useState } from 'react'
import { Stack, Link, Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Typography, TableSortLabel,IconButton, 
    Popover,
    List,
    ListItemButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Backdrop,
    Container,
    Paper} from '@mui/material'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight, mdiCloseThick, mdiCog, mdiViewColumn } from '@mdi/js'
import { useTheme } from '@mui/material/styles'
import * as sv from '@/service'
import { connect } from 'react-redux'
import { setInterface, setSnackbar } from '@/redux/actions'
import Accordion from '../accordion'
import LoadingList from '@/component/loadinglist'
import * as tp from '@/types'
import * as mt from '@/method'
import LoadingMessage from '@/component/loadingMessage'
import TransferList from '../transferList'

const TableView = ({
    pageId,
    parentId,

    intrface,
    modules,
    roles,
    errorStrings,
    customStrings,
    commonStrings,
    setInterface,
    relatedListConfig
}: {
    pageId: string,
    parentId: string,

    intrface: tp.PageItemGet,
    modules: tp.Modules[],
    roles: tp.Roles,
    errorStrings: Record<string, string>,
    customStrings: Record<string, string>,
    commonStrings: Record<string, string>,
    setInterface: Function,
    relatedListConfig: boolean
}) => {

    // Module
    const [module] = useState(modules.find(module => module.activated === true)?.module_id ?? '')

    // Theme
    const theme = useTheme()

    // Flag states
    const [flg, setFlg] = useState<tp.Loader>('LOADING')

    // Fetch list
    useEffect(() => {
        fetchRelatedList()
    }, [])

    // Revoke on module missing
    function tryReloading() {
        setSnackbar({
            'open': true,
            'message': errorStrings["tryReloading"]
        })
    }

    // Local states
    const [keys, setKeys] = useState<tp.Keys[]>([])
    const [records, setRecords] = useState<Record<string, any>[]>([])
    const [flows, setFlows] = useState<tp.Flow[]>([])
    useEffect(() => {
        if (records.length === 0) setFlg("NO_DATA")
        else setFlg("SUCCESS")
    }, [keys, records, flows])

    // Fetch related list
    const fetchRelatedList = () => {
        if (!mt.validateString(module)) {
            tryReloading()
            return
        }
        const data: tp.RelatedListPost = {
            item_id: intrface.header['_id'],
            page_id: pageId,
            parent_id: parentId,
            module_id: module
        }
        if (!mt.validateForm(data)) return
        sv.RelatedListService(data, setSnackbar, errorStrings)
        .then((response: tp.RelatedListGet) => {
            if (response === null) {
                setFlg('ERROR')
            } else {
                setKeys(response.keys[pageId])
                setRecords(response.data[pageId])
                setFlows(response.flows[pageId])
                setInterface({
                    ...intrface,
                    keys: {
                        ...intrface.keys,
                        [pageId]: response.keys[pageId]
                    }
                })
            }
        })
    }

    // Table Controls
    const [filterCol, setFilterCol] = useState('')
    type Order = 'asc' | 'desc'
    const [sorting, setSorting] = useState<Order>('desc')

    // Refresh Related List
    const refreshRelatedList = () => {
        if (!mt.validateString(module)) {
            tryReloading()
            return
        }
        const payload: tp.RefreshListPost = {
            item_id: intrface.header['_id'],
            page_id: pageId,
            module_id: module,
            filterCol: filterCol,
            sorting: sorting == 'asc' ? 1 : -1,
            offset: 0,
            searchSpec: [],
            parent_id: parentId
        }
        sv.RefreshRelatedList(payload, setSnackbar, errorStrings)
        .then((response: tp.RefreshDataGet) => {
            if (response !== null) {
                setRecords(response.data[pageId])
            }
        })
    }

    // Paging
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [uboundHit, setUboundHit] = useState(false)

    // Paging for Related List
    const invokePagingRL = () => {
        if (!mt.validateString(module)) {
            tryReloading()
            return
        }
        const payload: tp.RefreshListPost = {
            item_id: intrface.header['id'],
            page_id: pageId,
            module_id: module,
            filterCol: filterCol,
            sorting: sorting == 'asc' ? 1 : -1,
            offset: rowsPerPage * currentPage - 1,
            searchSpec: []
        }
        sv.RefreshRelatedList(payload, setSnackbar, errorStrings)
        .then((data: tp.RefreshDataGet) => {
            if (data !== null) {
                if (data.data[payload.page_id].length === 0) setUboundHit(true)
                else setRecords(records.concat(data.data[pageId]))
            }
        })
    }

    // Sorting by column
    const handleSorting = (key: string) => {
        if (filterCol !== key) {
            setSorting('desc')
            setFilterCol(key)
        } else {
            setSorting(sorting === 'asc' ? 'desc' : 'asc')
        }
        refreshRelatedList()
    }

    // Accordion states
    const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)

    // ItemView
    const [item, setItem] = useState<Record<string, any>>({})

    // Popover
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Backdrop states
    const [backdrop, setBackdrop] = useState(false)
    const [content, setContent] = useState<string>('')

    return (
        <>
        <Accordion
        page_id={pageId} 
        isAccordionExpanded={isAccordionExpanded}
        setIsAccordionExpanded={setIsAccordionExpanded}
        item={item}
        setItem={setItem}
        keys={keys}
        flows={flows}
        setRecords={setRecords}
        />
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
            flg === 'SUCCESS' &&
            keys.filter((key: tp.Keys) => key.visibility).map((key: tp.Keys, index: number) => (
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
            flg === 'SUCCESS' &&
            records.map((row: Record<string, any>, index: number) => {
                if (rowsPerPage * (currentPage - 1) <= index && index < rowsPerPage * currentPage) {
                    return (
                    <TableRow key={index}>
                    {
                        keys.filter((key: tp.Keys) => key.visibility).map((key: tp.Keys, index: number) => (
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
                            ) : (
                                key.api_key === 'name' ? (
                                    <Link style={{cursor: 'pointer'}} onClick={() => {
                                        setIsAccordionExpanded(true)
                                        setItem(row)
                                        mt.scrollToAnchor(pageId, 20)
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
                    && index === records.length - 1 && !uboundHit) {
                        invokePagingRL()
                    }
                    return null
                }
            })
        }
        </TableBody>
        </Table>
        {
            flg === 'LOADING' ? (
                <LoadingList />
            ): flg === 'ERROR' ? (
                <LoadingMessage>
                    <LoadingMessage.Title>{errorStrings["errorWhile"]}</LoadingMessage.Title>
                    <LoadingMessage.Subtitle>{errorStrings["tryReloading"]}</LoadingMessage.Subtitle>
                </LoadingMessage>
            ): flg === 'NO_DATA' ? (
                <LoadingMessage>
                    <LoadingMessage.Title>{errorStrings["noData"]}</LoadingMessage.Title>
                    <LoadingMessage.Subtitle>{errorStrings["noData2"]}</LoadingMessage.Subtitle>
                </LoadingMessage>
            ): null
        }
        </TableContainer>
        <Stack
        direction='row'
        alignItems='center'
        padding='10px 3px 0px 3px'
        justifyContent='space-between'
        spacing={1}
        >
        {
            relatedListConfig && (
                <IconButton size='small' onClick={handleClick}>
                    <Icon path={mdiCog} size={0.6} />
                </IconButton>
            )
        }
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        >
            <List dense>
                <ListItem
                disablePadding
                onClick={() => {
                    setBackdrop(true)
                    setContent('columns')
                    handleClose()
                }}
                >
                    <ListItemButton>
                        <ListItemIcon>
                            <Icon path={mdiViewColumn} size={1} />
                        </ListItemIcon>
                        <ListItemText primary={commonStrings['columns']} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Popover>
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
            flg === 'SUCCESS' && (
                rowsPerPage * currentPage <= records.length ||
                records.length % 200 == 0
            ) && (
                <IconButton size='small' onClick={() => setCurrentPage(currentPage + 1)}>
                    <Icon path={mdiChevronRight} size={0.8} />
                </IconButton>
            )
        }
        </Stack>
        </Stack>

        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
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
                        <IconButton onClick={() => setBackdrop(false)}>
                            <Icon path={mdiCloseThick} size={1} />
                        </IconButton>
                    </div>
                    {
                        content === 'columns' ? (
                            <TransferList
                            page_id={pageId ?? ''}
                            setBackDrop={setBackdrop}
                            keys={keys}
                            setKeys={setKeys}
                            />
                        ): null
                    }
                </Paper>
            </Container>
        </Backdrop>
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
    intrface: state.intrface,
    relatedListConfig: state.relatedListConfig
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableView)
