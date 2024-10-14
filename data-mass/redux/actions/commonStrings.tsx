export const SET_COMMONSTRINGS = 'SET_COMMONSTRINGS'

export const setCommonStrings = (payload: Record<string, string>) => ({
    type: setCommonStrings,
    payload: payload
})
