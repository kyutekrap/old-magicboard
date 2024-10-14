import React from 'react'
import { Snackbar, IconButton } from '@mui/material'
import Icon from '@mdi/react'
import { mdiCloseThick } from '@mdi/js'
import { connect } from 'react-redux'
import { setSnackbar } from '@/redux/actions'
import * as tp from '@/types'


const SnackBar = ({
        snackbar,
        setSnackbar
    }: {
        snackbar: tp.Snackbar,
        setSnackbar: Function
    }) => {

    const handleClose = () => {
        setSnackbar({
            open: false,
            message: ''
        })
    }

    const action = (
        <React.Fragment>
            <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={() => handleClose()}
            >
                <Icon path={mdiCloseThick} size={1} />
            </IconButton>
        </React.Fragment>
    )

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbar.message}
            action={action}
        />
    )
}

const mapStateToProps = (state: tp.RootState) => ({
    snackbar: state.snackbar
})

const mapDispatchToProps = (dispatch: any) => ({
    setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
