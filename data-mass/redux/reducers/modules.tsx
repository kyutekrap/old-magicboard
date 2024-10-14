import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.Modules[] = [
    
]

export const modules = (
    state = initialState,
    action: PayloadAction<tp.Modules>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_MODULES:
            return payload ? payload : initialState
        default:
            return state
    }
}
