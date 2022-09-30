import 'antd/dist/antd.min.css';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './containers/GlobalStyle';
import theme from './utils/theme';
import { GlobalProvider } from './context/global.state';

// 未登入
import Login from './pages/Login';

// 已登入
import Frame from './containers/Frame';
import FileList from './pages/FileList';
import AccountList from './pages/AccountList';

const PageRoute = () => {

    return (

        <ThemeProvider theme={theme}>
            <GlobalProvider>
                <GlobalStyle />
                <Routes>
                    <Route path="login" element={<Login />} />

                    <Route element={<Frame />}>
                        <Route index element={<FileList />} />
                        <Route path="admin_account" element={<AccountList />} />
                    </Route>
                </Routes>
            </GlobalProvider>
        </ThemeProvider>

    );

};

export default PageRoute;

// example
// https://codesandbox.io/s/react-router-v6-auth-demo-4jzltb?file=/src/App.js
