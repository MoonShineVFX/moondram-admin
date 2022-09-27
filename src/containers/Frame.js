import { useOutlet  } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';
import Navbar from './Navbar';

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

//
const Frame = () => {

    // hook
    const outlet = useOutlet();

    return (

        <Layout
            style={{
                marginLeft: 200,
            }}
        >
            <Navbar />

            <Layout>
                <ContentLayout>
                    {outlet}
                </ContentLayout>

                <FooterLayout>Copyright © Moonshine All rights reserved.</FooterLayout>
            </Layout>
        </Layout>
    );

};

export default Frame;
