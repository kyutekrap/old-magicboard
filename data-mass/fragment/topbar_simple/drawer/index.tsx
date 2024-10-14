import { mdiArrowLeftBox, mdiHome, mdiMenu } from "@mdi/js"
import Icon from "@mdi/react"
import { Box, IconButton, List, ListItem, ListItemText, Drawer, ListItemButton, ListItemIcon } from "@mui/material"
import { useState } from "react"
import { connect } from "react-redux"
import * as tp from '@/types'
import { setSession } from '@/storage'
import * as sv from '@/service'
import { setCustomStrings, setPages, setRoles, setModules, setSnackbar } from '@/redux/actions'

const DrawerMenu = ({
    setMenu,

    guestStrings,
    setSnackbar,
    errorStrings,
    setModules,
    setRoles,
    setPages,
    setCustomStrings
}: {
    setMenu: Function, 

    guestStrings: Record<string, string>,
    setSnackbar: Function,
    errorStrings: Record<string, string>,
    setModules: Function,
    setRoles: Function,
    setPages: Function,
    setCustomStrings: Function
}) => {

    // Drawer Open State
    const [drawerOpen, setDrawerOpen] = useState(false)

    // Guest login - button action
    const guestLogin = () => {
        const payload: tp.LoginPost = {}
        sv.LoginService(payload, setSnackbar, errorStrings)
        .then((response: tp.LoginGet) => {
            if (response !== null) {
                setModules(response.modules)
                setRoles(response.roles)
                setPages(response.pages)
                setCustomStrings(response.customStrings)
                setSession('API_KEY', response.access)
                window.location.href = '/dashboard'
            }
        })
    }

    return (
        <>
        <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ mr: 1 }}
        onClick={() => setDrawerOpen(!drawerOpen)}
        >
            <Icon path={mdiMenu} size={1} />
        </IconButton>

        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                    <IconButton onClick={() => setDrawerOpen(!drawerOpen)} style={{margin: 5}}>
                        <Icon path={mdiArrowLeftBox} size={1}  />
                    </IconButton>
                    <ListItem disablePadding>
                        <ListItemButton sx={{ alignItems: 'center' }} onClick={() => { setMenu(0); setDrawerOpen(false) }} >
                            <ListItemIcon sx={{ minWidth: '40px' }}>
                                <Icon path={mdiHome} size={1} style={{cursor: 'pointer'}} />
                            </ListItemIcon>
                            <ListItemText primary={guestStrings["home"]} style={{cursor: 'pointer'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { guestLogin(); setMenu(3); setDrawerOpen(false) }}>
                            <ListItemText primary={guestStrings["trial"]} style={{cursor: 'pointer'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { setMenu(1); setDrawerOpen(false) }}>
                            <ListItemText primary={guestStrings["terms"]} style={{cursor: 'pointer'}} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { setMenu(2); setDrawerOpen(false) }}>
                            <ListItemText primary={guestStrings["docuRepo"]} style={{cursor: 'pointer'}} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
        </>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    guestStrings: state.guestStrings,
    errorStrings: state.errorStrings
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
    setModules: (payload: tp.Modules[]) => dispatch(setModules(payload)),
    setRoles: (payload: tp.Roles) => dispatch(setRoles(payload)),
    setPages: (payload: tp.Pages[]) => dispatch(setPages(payload)),
    setCustomStrings: (payload: Record<string, string>) => dispatch(setCustomStrings(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu)
