import 'antd/dist/antd.css';
import { Fragment, useEffect, useState, useContext } from 'react';
import { Routes, Route, useLocation, redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './containers/GlobalStyle';
import theme from './utils/theme';
import { GlobalProvider, GlobalContext } from './context/global.state';
import Service from './utils/util.service';

// 未登入
import Login from './pages/Login';

// 已登入
import Frame from './containers/Frame';
import Guest from './pages/Guest';
import FileList from './pages/FileList';
import AccountList from './pages/AccountList';

const PageRoute = () => {

    // Context
    const { userInfo, globalDispatch } = useContext(GlobalContext);

    // State
    const [logged, setLogged] = useState(false);

    useEffect(() => {

        const loader = async () => {

            const user = await Service.userInfo();

            // console.log('user:', !!user.uid)
            setLogged(!!user.uid);
            globalDispatch({ type: 'user_info', payload: user });

            if (!user) {

                return redirect('/login');

            }
        };

        loader();

    }, [globalDispatch]);

    return (

        <Fragment>
            <Routes>
                {/* <Route index element={<Guest />} /> */}
                <Route path="login" element={<Login logged={logged} />} />

                <Route element={<Frame />}>
                    <Route index element={<FileList />} />
                    <Route path="admin_account" element={<AccountList />} />
                </Route>
            </Routes>
        </Fragment>

    );

};

export default PageRoute;

// example
// https://codesandbox.io/s/react-router-v6-auth-demo-4jzltb?file=/src/App.js
