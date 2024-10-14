import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'


const initialState: Record<string, string> = {}

export const customStrings = (
    state = initialState,
    action: PayloadAction<Record<string, string>>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_CUSTOMSTRINGS:
            return payload ? payload : initialState
        default:
            return state
    }
}
