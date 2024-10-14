'use client'
import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'


const initialState: string = 'en-US'

export const language = (
    state = initialState,
    action: PayloadAction<string>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_LANGUAGE:
            return payload ? payload : initialState
        default:
            return state
    }
}
