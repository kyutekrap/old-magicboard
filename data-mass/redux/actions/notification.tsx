import * as tp from '@/types'

export const SET_NOTIFICATION = 'SET_NOTIFICATION'

export const setNotification = (payload: tp.Notification[]) => ({
    type: SET_NOTIFICATION,
    payload: payload
})
