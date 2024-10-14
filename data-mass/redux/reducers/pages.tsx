import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.Pages[] = []

export const pages = (
    state = initialState,
    action: PayloadAction<tp.Pages>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_PAGES:
            return payload ? payload : initialState
        default:
            return state
    }
}
