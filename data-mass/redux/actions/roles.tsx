import * as tp from '@/types'

export const SET_ROLES = 'SET_ROLES'

export const setRoles = (payload: tp.Roles) => ({
    type: SET_ROLES,
    payload: payload
})
