import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import * as tp from '@/types'
import { connect } from 'react-redux'
import Drawer from './drawer';


const Topbar = ({
    setMenu,
    
    guestStrings
}: {
    setMenu: Function,

    guestStrings: Record<string, string>
}) => {
    
    return (
        <Box style={{ width: '100vw', position: 'fixed', top: 0, zIndex: 10 }}>
            <AppBar position="static" elevation={0} color='inherit'>
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                <div style={{flex: 1}}>
                    <Drawer setMenu={setMenu} />
                </div>
                <div style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
                <Button color="inherit" onClick={() => window.location.href = '/authenticate'}>
                    {guestStrings["login"]}
                </Button>
                </div>
                </Toolbar>
            </AppBar>
            <Divider />
        </Box>
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    guestStrings: state.guestStrings
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
