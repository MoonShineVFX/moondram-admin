import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyle from './containers/GlobalStyle';

import theme from './utils/theme';
import { GlobalProvider } from './context/global.state';

// 未登入
import Login from './pages/Login';

// 已登入
import Navbar from './containers/Navbar';

import Home from './pages/Home';
import Account from './pages/Account';
import PrivateLayout from './PrivateLayout';

const { Content, Footer } = Layout;

//
const ContentLayout = styled(Content)({
    minHeight: 'calc(100vh - 54px - 30px)', // footer: 54px, main margin bottom: 30px
    marginBottom: '30px',
    padding: '30px 30px 20px',
});

//
const FooterLayout = styled(Footer)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: theme.palette.container,
    paddingTop: '16px',
    paddingBottom: '16px',
}));

const Test = () => {
    return (
        <PrivateLayout>
            <Routes>
                <Route index element={<Home />} />
                <Route path="admin_account" element={<Account />} />
            </Routes>
        </PrivateLayout>

    )
}

const Frame = () => (

    <ThemeProvider theme={theme}>
        <GlobalProvider>
            <GlobalStyle />

            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Test />} />
            </Routes>
        </GlobalProvider>
    </ThemeProvider>

);

export default Frame;

// example
// https://codesandbox.io/s/react-router-v6-auth-demo-4jzltb?file=/src/App.js
