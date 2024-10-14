import * as tp from '@/types'

export const SET_PAGES = 'SET_PAGES'

export const setPages = (payload: tp.Pages[]) => ({
    type: SET_PAGES,
    payload: payload
})
