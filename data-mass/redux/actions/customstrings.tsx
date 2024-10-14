export const SET_CUSTOMSTRINGS = 'SET_CUSTOMSTRINGS'

export const setCustomStrings = (payload: Record<string, string>) => ({
    type: SET_CUSTOMSTRINGS,
    payload: payload
})
