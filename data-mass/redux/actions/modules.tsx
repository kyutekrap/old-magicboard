import * as tp from '@/types'

export const SET_MODULES = 'SET_MODULES'

export const setModules = (payload: tp.Modules[]) => ({
    type: SET_MODULES,
    payload: payload
})
