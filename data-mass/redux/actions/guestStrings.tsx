export const SET_GUESTSTRINGS = 'SET_GUESTSTRINGS'

export const setGuestStrings = (payload: Record<string, string>) => ({
    type: SET_GUESTSTRINGS,
    payload: payload
})
