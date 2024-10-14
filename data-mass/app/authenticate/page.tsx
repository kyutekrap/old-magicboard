'use client'
import React, { Suspense, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from "@/redux/store"
import Login from '@/view/login'
import Recover from '@/view/recover'
import Reset from '@/view/reset'
import { useSearchParams } from 'next/navigation'
import * as mt from '@/method'


const InnerPage = () => {

    // Search URL Params & Intrface
    const searchParams = useSearchParams()
    const [link] = useState(searchParams.get('link') ?? '')

    const [state, setState] = useState(
        mt.validateString(link) ? 'reset' : 'login'
    )

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {
                    state === 'login' ? (
                        <Login setState={setState} />
                    ) : state === 'recover' ? (
                        <Recover setState={setState} />
                    ) : (
                        <Reset link={link} />
                    )
                }
            </PersistGate>
        </Provider>
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
