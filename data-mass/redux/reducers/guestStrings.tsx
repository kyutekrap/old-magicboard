import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import strings from '@/strings/guest/en-US.json'


const initialState: Record<string, string> = strings

export const guestStrings = (
    state = initialState,
    action: PayloadAction<Record<string, String>>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_GUESTSTRINGS:
            return payload ? payload : initialState
        default:
            return state
    }
}
