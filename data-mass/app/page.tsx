'use client'
import Page1 from '@/static/page1'
import { useEffect, useState } from 'react'
import Topbar from '@/fragment/topbar_simple'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from "@/redux/store"
import { CircularProgress, Paper } from '@mui/material'
import { Page5 } from '@/static/page5'
import Page2 from '@/static/page2'
import LoadingMessage from '@/component/loadingMessage'

export default function Home() {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    const [menu, setMenu] = useState(0)

    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {
                menu !== 3 && (
                    <Topbar setMenu={setMenu} />
                )
            }
            <Paper style={{ paddingTop: 85, paddingLeft: 20, paddingRight: 20, paddingBottom: 20, minHeight: `calc(100vh - 105px)` }}>
                {
                    menu === 0 ? (
                        <Page1 />
                    ) : menu === 1 ? (
                        <Page5 />
                    ) : menu === 2 ? (
                        <Page2 />
                    ) : menu === 3 ? (
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%'}}>
                            <LoadingMessage>
                                <LoadingMessage.Title>Logging into Magic Board</LoadingMessage.Title>
                                <LoadingMessage.Subtitle><CircularProgress /></LoadingMessage.Subtitle>
                            </LoadingMessage>
                        </div>
                    ) : null
                }
            </Paper>
        </PersistGate>
        </Provider>
    );
}
