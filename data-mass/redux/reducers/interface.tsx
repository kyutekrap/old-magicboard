'use client'
import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.PageItemGet = {
    'resultCd': false,
    'resultMsg': '',
    'header': {},
    'data': {

    },
    'keys': {

    },
    'flows': {
        
    },
    'pages': []
}

export const intrface = (
    state = initialState,
    action: PayloadAction<tp.PageItemGet>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_INTERFACE:
            return payload ? payload : initialState
        default:
            return state
    }
}
