import * as tp from '@/types'

export const SET_SNACKBAR = 'SET_SNACKBAR'

export const setSnackbar = (payload: tp.Snackbar) => ({
    type: SET_SNACKBAR,
    payload: payload
})
