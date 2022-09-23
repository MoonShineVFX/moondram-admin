import React, { createContext, useReducer } from 'react';
import { globalReducer, lightboxReducer } from './global.reducer';

// Global
const globalInitState = {
    currCate: 'all',
    files: [],
    searchResData: [],
    accounts: [],
};

// Lightbox
const lightboxInitState = {
    visible: false,
    currEvent: '',
};

// Create Context
const GlobalContext = createContext(null);

// Provider
const GlobalProvider = ({ children }) => {

    const [globalState, globalDispatch] = useReducer(globalReducer, globalInitState);
    const [lightboxState, lightboxDispatch] = useReducer(lightboxReducer, lightboxInitState);
    const {
        currCate,
        files,
        searchResData,
        accounts,
    } = globalState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    return (

        <Provider value={{
            // 全域資料
            currCate,
            files,
            searchResData,
            accounts,

            // lightbox
            visible,
            currEvent,

            // dispatch
            globalDispatch,
            lightboxDispatch,
        }}>
            {children}
        </Provider>

    );

};

export { GlobalContext, GlobalProvider };
