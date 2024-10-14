import { Backdrop, Container, IconButton, Paper, TextField } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import * as tp from '@/types'
import Icon from "@mdi/react"
import { mdiCloseThick } from "@mdi/js"
import { useState } from "react"
import { connect } from "react-redux"
import SearchList from "@/fragment/searchList"
import * as mt from '@/method'
import { useSearchParams } from "next/navigation"


const Reference = ({
    label,
    pageId,
    data,
    setPayload,

    intrface
}: {
    label: string,
    pageId: string,
    data: Record<string, any>,
    setPayload?: Function,

    intrface: tp.PageItemGet
}) => {

    // Theme
    const theme = useTheme()

    // Search URL Params & Intrface
    const searchParams = useSearchParams()
    const [parent_id] = useState(searchParams.get('id') ?? '')
    const [record_id] = useState(searchParams.get('item') ?? '')

    // Popup States
    const [popup, setPopup] = useState(false)

    // Value States
    const [value, setValue] = useState<tp.ReferenceList | Record<string, any>>(
        pageId === parent_id ? {_id: record_id || '', name: intrface.header['Name']}
        : data[label] ? data[label]
        : {_id: '', name: ''}
    )

    // Set value handler
    const handleSetValue = (value: tp.ReferenceList) => {
        setValue(value)
        if (setPayload) {
            mt.inputFixedHandler(setPayload, 'value', value)
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
            <SearchList parent_id={parent_id} pageId={pageId} onClick={handleSetValue} />
        </Paper>
        </Container>
        </Backdrop>

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
