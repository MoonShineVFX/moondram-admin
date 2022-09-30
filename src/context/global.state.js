import {
    createContext,
    useReducer,
    useEffect,
    useState,
} from 'react';
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

    // State
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        Service.userInfo()
            .then((resData) => {

                globalDispatch({ type: 'user_info', payload: resData });

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);

    return (

        !loading && (

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
        )

    );

};

export { GlobalContext, GlobalProvider };
