import { Backdrop, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import * as tp from '@/types'
import Icon from "@mdi/react"
import { mdiCloseThick, mdiLinkBox } from "@mdi/js"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import SearchList from "@/fragment/searchList"
import * as mt from '@/method'

const Reference = ({
    type,
    label,
    pageId,
    data,
    setPayload,
    parent_id,

    customStrings,
    intrface
}: {
    type: 'fieldset' | 'field',
    label: string,
    pageId?: string,
    data: tp.ReferenceList,
    setPayload?: Function,
    parent_id: string,

    customStrings: Record<string, string>,
    intrface: tp.PageItemGet
}) => {

    // Theme
    const theme = useTheme()

    // Popup States
    const [popup, setPopup] = useState(false)

    // Init States
    const [value, setValue] = useState<tp.ReferenceList>(data)
    useEffect(() => {
        var newValue = data
        if (!mt.validateString(data._id) && pageId === parent_id) {
            newValue = {
                _id: pageId,
                name: intrface.header["Name"]
            }
        }
        setValue(newValue)
        mt.inputFixedHandler(setPayload, label, newValue)
    }, [])

    // Clear value
    function onChange(input: string) {
        if (input === "") {
            setValue({
                _id: "",
                name: ""
            })
        }
    }

    return (
        <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={popup}
        >
        <Container 
            maxWidth='sm' 
            sx={{ 
                maxHeight: '90vh',  // 90% of the viewport height
                overflowY: 'auto',  // Enable vertical scrolling
                paddingRight: '1rem', // Provide space for the hidden scrollbar
                '&::-webkit-scrollbar': { display: 'none' },  // Hide scrollbar in WebKit-based browsers
                '-ms-overflow-style': 'none',  // Hide scrollbar in IE and Edge
                'scrollbar-width': 'none',  // Hide scrollbar in Firefox
            }}
        >
        <Paper style={{ padding: 20 }}>
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '10px'}}>
                <IconButton onClick={() => setPopup(false)}>
                    <Icon path={mdiCloseThick} size={1} />
                </IconButton>
            </div>
            <SearchList parent_id={parent_id} pageId={pageId ?? ''} onClick={setValue} setPayload={setPayload} label={label} />
        </Paper>
        </Container>
        </Backdrop>
        { type === 'fieldset' ? (
            <>
            <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            >
            <Stack
            direction='row'
            alignItems='center'
            flex={1}
            >
            <div
            onClick={() => setPopup(true)}
            >
                <Icon
                path={mdiLinkBox}
                size={0.9}
                style={{cursor: 'pointer'}}
                />
            </div>
            <Typography variant='subtitle2'>
                {mt.getString(label ?? '', customStrings)}
            </Typography>
            </Stack>
            <input 
            onChange={(event) => onChange(event.target.value)}
            value={value.name}
            style={{
                flex: 2,
                padding: '3px',
                width: 'calc(100% - 6px)',
                borderRadius: '3px',
                outline: 'none',
                fontSize: '0.9rem',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} />
            </Stack>
            </>
        ): type === 'field' ? (
            <TextField
            size='small'
            onFocus={() => setPopup(true)}
            value={value.name}
            style={{
                padding: '3px',
                borderRadius: '3px',
                outline: 'none',
                fontSize: '0.9rem',
                borderWidth: '1px',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.12)'
            }} />
        ): null }
        </>
    )
}


const mapStateToProps = (state: tp.RootState) => ({
    customStrings: state.customStrings,
    intrface: state.intrface
})

const mapDispatchToProps = (_dispatch: any) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Reference)
