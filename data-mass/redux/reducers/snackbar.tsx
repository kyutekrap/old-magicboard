import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.Snackbar = {
    open: false,
    message: ''
}

export const snackbar = (
    state = initialState,
    action: PayloadAction<tp.Snackbar>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_SNACKBAR:
            return payload ? payload : initialState
        default:
            return state
    }
}
