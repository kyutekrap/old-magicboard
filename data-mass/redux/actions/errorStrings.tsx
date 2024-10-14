export const SET_ERRORSTRINGS = 'SET_ERRORSTRINGS'

export const setErrorStrings = (payload: Record<string, string>) => ({
    type: SET_ERRORSTRINGS,
    payload: payload
})
