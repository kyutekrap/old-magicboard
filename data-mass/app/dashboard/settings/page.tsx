'use client'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from "@/redux/store"
import TopBar from '@/fragment/topbar'
import { PersistGate } from 'redux-persist/integration/react'
import Settings from '@/view/settings'
import { getSession } from '@/storage'
import * as mt from '@/method'
import * as tp from '@/types'


const Page = () => {

    // Flag States
    const [flg, setFlg] = useState<tp.Loader>('LOADING')

    // Check Session
    useEffect(() => {
        const API_KEY = getSession('API_KEY')
        if (!mt.validateString(API_KEY))
            window.location.href = '/authenticate'
        setFlg('SUCCESS')
    }, [])
    
    return (
        flg === 'SUCCESS' ? (
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TopBar/>
                <Settings/>
            </PersistGate>
            </Provider>
        ) : null
    )
}

export default Page
