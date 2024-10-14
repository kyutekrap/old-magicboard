import React, { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { connect } from 'react-redux'
import TableView from '../../fragment/table'
import * as tp from '@/types'
import * as mt from '@/method'
import * as sv from '@/service'
import { setInterface, setSnackbar } from '@/redux/actions'
import Accordion from '@/fragment/accordion'
import SnackBar from '@/component/snackbar'

const ListView = ({
  pageId,

  modules,
  setSnackbar,
  errorStrings,
  setInterface,
  intrface
}: {
  pageId: string,

  modules: tp.Modules[],
  setSnackbar: Function,
  errorStrings: Record<string, string>,
  setInterface: Function,
  intrface: tp.PageItemGet
}) => {

  // Status Flag
  const [flag, setFlag] = useState<tp.Loader>('LOADING')

  // Module
  const [module] = useState(modules.find(module => module.activated)?.module_id)

  // On load
  useEffect(() => {
    if (mt.validateString(module)) {
      const payload: tp.PageItemPost = {
        page_id: pageId,
        module_id: module ?? '',
        offset: 0
      }
      sv.PageItemService(payload, setSnackbar, errorStrings)
      .then((data: tp.PageItemGet) => {
          if (data !== null) {
            setInterface(data)
            setItem(data.header)
            setFlag('SUCCESS')
          } else setFlag("ERROR")
      })
    } else {
      setSnackbar({
        open: true,
        message: errorStrings["tryReloading"]
      })
    }
  }, [])

  // Accordion states
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false)

  // ItemView
  const [item, setItem] = useState<Record<string, any>>({})

  return (
    <>
    <SnackBar />
    <Stack
    direction="column"
    spacing={2}
    paddingTop={mt.isMobile() ? 8.6 : 10}
    paddingLeft={2}
    paddingRight={2}
    paddingBottom={2}
    >
      {
        intrface.keys[pageId] && intrface.flows[pageId] && (
          <Accordion
          page_id={pageId} 
          isAccordionExpanded={isAccordionExpanded} 
          setIsAccordionExpanded={setIsAccordionExpanded}
          item={item}
          setItem={setItem}
          keys={intrface.keys[pageId]}
          flows={intrface.flows[pageId]}
          />
        )
      }
      {
        flag === 'SUCCESS' && (
          <TableView
          pageId={pageId}
          setIsAccordionExpanded={setIsAccordionExpanded}
          setItem={setItem}
          />
        )
      }
    </Stack>
    </>
  )
}

const mapStateToProps = (state: tp.RootState) => ({
  modules: state.modules,
  errorStrings: state.errorStrings,
  intrface: state.intrface
})

const mapDispatchToProps = (dispatch: any) => ({
  setSnackbar: (payload: tp.Snackbar) => dispatch(setSnackbar(payload)),
  setInterface: (payload: tp.PageItemGet) => dispatch(setInterface(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)
