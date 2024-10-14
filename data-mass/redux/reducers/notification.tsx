import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.Notification[] = []

export const notification = (
    state = initialState,
    action: PayloadAction<string>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_NOTIFICATION:
            return payload ? payload : initialState
        default:
            return state
    }
}
