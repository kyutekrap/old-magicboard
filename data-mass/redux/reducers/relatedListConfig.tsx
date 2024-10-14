import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'


const initialState: boolean = false

export const relatedListConfig = (
    state = initialState,
    action: PayloadAction<boolean>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_RELATED_LIST_CONFIG:
            return payload ? payload : initialState
        default:
            return state
    }
}
