"use client"

import { SessionProvider } from "next-auth/react"
import StoreProvider from "./StoreProvider";

export const Providers = ({ children }: { children: React.ReactNode }) => {

    return (
        <SessionProvider>
            <StoreProvider >
                {children}
            </StoreProvider>
        </SessionProvider>
    )
};