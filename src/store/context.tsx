import React, { FC, ReactNode, useContext } from "react"

import { Store } from "./store";

export const StoreContext = React.createContext<Store>({} as Store);

export const StoreProvider: FC<{ store: Store, children: ReactNode }> = ({ children, store }) => {
    return (
        <StoreContext.Provider value={store} > {children} </StoreContext.Provider>
    )
}

export const useStore = (): Store => useContext(StoreContext);