import React, { createContext, useReducer, useEffect } from 'react';
import { globalReducer, lightboxReducer } from './global.reducer';
import Service from '../utils/util.service';

// Global
const globalInitState = {
    currCate: 'all',
    files: [],
    searchResData: [],
    accounts: [],
    userInfo: null,
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
        userInfo,
    } = globalState;
    const { visible, currEvent } = lightboxState;
    const { Provider } = GlobalContext;

    // useEffect(() => {

    //     Service.userInfo()
    //         .catch((resData) => {

    //             console.log('resData:', resData);
    //             // if (resData === 401) window.location = '/login';

    //         })
    //         .then((resData) => {

    //             // setLogged(!!uid);
    //             globalDispatch({ type: 'user_info', payload: resData });

    //         });

    // }, [])

    return (

        <Provider value={{
            // 全域資料
            currCate,
            files,
            searchResData,
            accounts,
            userInfo,

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
