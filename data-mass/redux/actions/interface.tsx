import * as tp from '@/types'

export const SET_INTERFACE = 'SET_INTERFACE'

export const setInterface = (payload: tp.PageItemGet) => ({
    type: SET_INTERFACE,
    payload: payload
})
