import { Layout } from 'antd';
import styled, { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';
import GlobalStyle from './containers/GlobalStyle';

import theme from './utils/theme';
import { GlobalProvider } from './context/global.state';

// 未登入
import useToken from './utils/useToken';
import Login from './pages/Login';

// 已登入
import PageRoute from './PageRoute';
import Navbar from './containers/Navbar';

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

const Frame = () => {

    const { token } = useToken();

    // 未登入
    if (!token) {

        return <Login />;

    }

    return (

        <ThemeProvider theme={theme}>
            <GlobalProvider>
                <GlobalStyle />

                <Layout
                    style={{
                        marginLeft: 200,
                    }}
                >
                    <Navbar />

                    <Layout>
                        <ContentLayout>
                            <PageRoute />
                        </ContentLayout>

                        <FooterLayout>Copyright © Moonshine All rights reserved.</FooterLayout>
                    </Layout>
                </Layout>
            </GlobalProvider>
        </ThemeProvider>

    );

};

export default Frame;
