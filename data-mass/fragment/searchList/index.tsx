import { IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { setSnackbar } from "@/redux/actions"
import Searchbox from "@/component/searchbox"
import * as tp from '@/types'
import * as mt from '@/method'
import * as sv from '@/service'
import Icon from '@mdi/react'
import { mdiContentCopy } from '@mdi/js'

const SearchList = ({
    pageId,
    onClick,
    setPayload,
    label,
    parent_id,

    errorStrings,
    customStrings,
    modules,
    setSnackbar,
    roles
}: {
    pageId: string,
    onClick?: any,
    setPayload?: Function,
    label?: string,
    parent_id?: string,

    errorStrings: Record<string, string>,
    customStrings: Record<string, string>,
    modules: tp.Modules[],
    setSnackbar: Function,
    roles: tp.Roles
}) => {

    // Filtered Data
    const [data, setData] = useState<tp.ReferenceList[]>([])

    // Modules
    const [module] = useState(modules.find(module => module.activated)?.module_id)

    // Check module loaded
    function validateModule() {
        setSnackbar({
            'open': true,
            'message': errorStrings["tryReloading"]
        })
    }

    // Search Text States
    const [searchText, setSearchText] = useState<string>('')

    // Update Search Text State
    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            handleFilterData()
        }
    }

    // Search Button
    const handleFilterData = () => {
        if (data.length % 200 === 0) {
            if (!mt.validateString(module)) {
                validateModule()
                return
            }
            const payload: tp.ReferenceListPost = {
                page_id: pageId,
                module_id: module ?? '',
                search: searchText,
                parent_id: parent_id ?? ''
            }
            sv.ReferenceListService(payload, setSnackbar, errorStrings)
            .then((data: tp.ReferenceListGet) => {
                if (data !== null) setData(data.data)
            })
        } else {
            setData(data.filter(d => 
                d.name.toLowerCase().includes(searchText.toLowerCase())
            ))
        }
    }

    // For setValue() and setPayload()
    const handleCustomFunction = (d: tp.ReferenceList) => {
        if (onClick) onClick(d)
        if (setPayload && label) mt.inputFixedHandler(setPayload, label, d)
    }

    // If pageId (Reference Key) is not available.
    useEffect(() => {
        if (!mt.validateString(pageId)) {
            setSnackbar({
                "open": true,
                "message": errorStrings["tryReloading"]
            })
        }
    }, [])
    
    // Inner View
    const InnerView = () => {
        return (
            <>
            <Searchbox onChange={setSearchText} onKeyDown={handleKeyDown} searchText={searchText} />
            <TableContainer
            sx={{
                borderWidth: '0px',
                overflow: 'auto',
                marginTop: '2px'
            }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>{mt.getString('Name', customStrings)}</TableCell>
                        {
                            setPayload && (
                                <TableCell></TableCell>
                            )
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                data.map((d: tp.ReferenceList, i: number) => (
                    <TableRow key={i}>
                        <TableCell>
                        {
                            mt.validateRole(roles, 'read', pageId) ? (
                                <Link
                                style={{cursor: 'pointer'}}
                                color='inherit'
                                onClick={() => window.location.href = '/dashboard?id='+pageId+'&item='+d._id}>
                                    {d.name}
                                </Link>
                            ): (
                                d.name
                            )
                        }
                        </TableCell>
                        {
                            setPayload && (
                                <TableCell align="right">
                                    <IconButton onClick={() => handleCustomFunction(d)}>
                                        <Icon path={mdiContentCopy} size={0.8} />
                                    </IconButton>
                                </TableCell>
                            )
                        }
                    </TableRow>
                ))
                }
                </TableBody>
            </Table>
            </TableContainer>
            </>
        )
    }

    return (
        pageId && (
            <InnerView />
        )
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    errorStrings: state.errorStrings,
    customStrings: state.customStrings,
    intrface: state.intrface,
    modules: state.modules,
    roles: state.roles
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)
