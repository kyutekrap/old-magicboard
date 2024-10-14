import * as event from '@/redux/actions'
import {PayloadAction} from '@reduxjs/toolkit'
import * as tp from '@/types'


const initialState: tp.Roles = {
    profile_name: '',
    read_role: [],
    create_role: [],
    update_role: [],
    delete_role: []
}

export const roles = (
    state = initialState,
    action: PayloadAction<tp.Roles>,
) => {
    const type = action.type;
    const payload = action.payload;
    switch (type) {
        case event.SET_ROLES:
            return payload ? payload : initialState
        default:
            return state
    }
}
