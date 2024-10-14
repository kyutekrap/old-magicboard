import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import strings from '@/strings/error/en-US.json'


const initialState: Record<string, string> = strings

export const errorStrings = (
    state = initialState,
    action: PayloadAction<Record<string, String>>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_ERRORSTRINGS:
            return payload ? payload : initialState
        default:
            return state
    }
}
