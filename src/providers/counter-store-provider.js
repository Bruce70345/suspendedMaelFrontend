'use client'
import { createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { createCounterStore } from '@/stores/counter-store'


export const CounterStoreContext = createContext(
    undefined,
)

export const CounterStoreProvider = ({
    children,
}) => {
    const storeRef = useRef()
    if (!storeRef.current) {
        storeRef.current = createCounterStore()
    }

    return (
        <CounterStoreContext.Provider value={storeRef.current}>
            {children}
        </CounterStoreContext.Provider>
    )
}

export const useCounterStore = (
    selector) => {
    const counterStoreContext = useContext(CounterStoreContext)

    if (!counterStoreContext) {
        throw new Error(`useCounterStore must be used within CounterStoreProvider`)
    }

    return useStore(counterStoreContext, selector)
}