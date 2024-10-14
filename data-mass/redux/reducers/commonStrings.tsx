import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import strings from '@/strings/common/en-US.json'


const initialState: Record<string, string> = strings

export const commonStrings = (
    state = initialState,
    action: PayloadAction<Record<string, String>>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_COMMONSTRINGS:
            return payload ? payload : initialState
        default:
            return state
    }
}
