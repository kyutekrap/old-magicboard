'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from "@/redux/store"
import TopBar from '@/fragment/topbar'
import { PersistGate } from 'redux-persist/integration/react'
import { getSession } from '@/storage'
import { useSearchParams } from 'next/navigation'
import * as mt from '@/method'
import * as tp from '@/types'
import LoadingMessage from '@/component/loadingMessage'
import ItemView from '@/view/itemview'
import ListView from '@/view/listview'

const InnerPage = () => {

    // Check Session
    useEffect(() => {
        const API_KEY = getSession('API_KEY')
        if (!mt.validateString(API_KEY))
            window.location.href = '/authenticate'
        setFlg('SUCCESS')
    }, [])
    
    // Search URL Params & Intrface
    const searchParams = useSearchParams()
    const [pageId] = useState(searchParams.get('id') ?? '')
    const [itemId] = useState(searchParams.get('item') ?? '')

    // Flag States
    const [flg, setFlg] = useState<tp.Loader>('LOADING')

    return (
        flg === 'SUCCESS' && (
            <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TopBar/>
                {
                    mt.validateString(pageId) && mt.validateString(itemId) ? (
                        <ItemView pageId={pageId} itemId={itemId} />
                    ): mt.validateString(pageId) && !mt.validateString(itemId) ? (
                        <ListView pageId={pageId} />
                    ): (
                        <div style={{display: 'flex', alignItems: 'center', height: '80vh', width: '100%'}}>
                            <LoadingMessage>
                                <LoadingMessage.Title>Welcome to Magic Board</LoadingMessage.Title>
                                <LoadingMessage.Subtitle>Start navigating</LoadingMessage.Subtitle>
                            </LoadingMessage>
                        </div>
                    )
                }
            </PersistGate>
            </Provider>
        )
    )
}

const Page = () => {
    return (
        <Suspense>
            <InnerPage />
        </Suspense>
    )
}

export default Page
