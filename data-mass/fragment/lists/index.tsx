import { setInterface } from '@/redux/actions'
import * as tp from '@/types'
import { connect } from 'react-redux'
import RelatedList from '../layout/relatedList'
import { useState } from 'react'
import { Button, Paper } from '@mui/material'
import { lightBlue } from '@mui/material/colors'

const Lists = ({
    commonStrings,
    intrface,
    setInterface,
    setBackDrop
}: {
    commonStrings: Record<string, string>,
    intrface: tp.PageItemGet,
    setInterface: Function,
    setBackDrop: Function
}) => {

    // Columns
    const [lists, setLists] = useState<tp.RelatedList[]>(intrface.pages)

    // Apply changes and close
    const saveLists = () => {
        setInterface({
            ...intrface,
            pages: lists
        })
        setBackDrop(false)
    }

    return (
        <>
        <Paper style={{ flex: 1 }}>
            <RelatedList
            lists={lists}
            setLists={setLists}
            />
        </Paper>

        <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 7, marginTop: 20}}>
            <Button variant='contained' style={{background: lightBlue[700]}}
                onClick={() => saveLists()}>
                {commonStrings["save"]}
            </Button>
        </div>
        </>
    );
}

const mapStateToProps = (state: tp.RootState) => ({
    commonStrings: state.commonStrings,
    customStrings: state.customStrings,
    intrface: state.intrface
})

const mapDispatchToProps = (dispatch: any) => ({
    setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
