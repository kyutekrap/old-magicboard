import { setInterface } from '@/redux/actions'
import * as tp from '@/types'
import { connect } from 'react-redux'
import ColumnList from '../layout/columnList'
import { useState } from 'react'
import { Button, Paper } from '@mui/material'
import { lightBlue } from '@mui/material/colors'

const TransferList = ({
  page_id,
  setBackDrop,
  keys,
  setKeys,

  commonStrings,
  intrface,
  setInterface
}: {
  page_id: string,
  setBackDrop: Function,
  keys?: tp.Keys[],
  setKeys?: Function,

  commonStrings: Record<string, string>,
  intrface: tp.PageItemGet,
  setInterface: Function
}) => {

  // Columns
  const [columns, setColumns] = useState<tp.Keys[]>(keys ? keys : intrface.keys[page_id])

  // Apply changes and close
  const saveColumns = () => {
    if (setKeys) {
      setKeys(columns)
    } else {
      setInterface({
        ...intrface,
        keys: {
          ...intrface.keys,
          [page_id]: columns
        }
      })
    }
    setBackDrop(false)
  }

  return (
    <>
    <Paper style={{ flex: 1 }}>
      <ColumnList
      columns={columns}
      setColumns={setColumns}
      />
    </Paper>
    <div style={{display: 'flex', justifyContent: 'flex-end', paddingRight: 7, marginTop: 20}}>
      <Button variant='contained' style={{background: lightBlue[700]}}
        onClick={() => saveColumns()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TransferList)
