import { NavLink, redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import styled from 'styled-components';
import Buttons from '../components/Buttons';
import utilConst from '../utils/util.const';

const { Sider } = Layout;
const { navbar: navbrItem } = utilConst;

const SiderLayout = styled(Sider)(({
    height: '100vh',
    textAlign: 'center',
    padding: '20px 0',
    position: 'fixed',
    left: '0',
    overflow: 'auto',
    zIndex: '1',
    '.side-menu': {
        paddingInlineStart: '0',
    },
    '.menu-wrap': {
        textAlign: 'left',
    },
    'a': {
        color: '#FFF',
        display: 'block',
        margin: '10px 0',
        padding: '8px 24px',
        opacity: '0.6',
        transition: 'all 0.2s linear',
        '&:hover': {
            opacity: '0.8',
        },
        '&.active': {
            backgroundColor: 'gray',
            opacity: '1',
            transition: 'all 0.2s linear',
        },
    },
    '.menu-logout': {
        textAlign: 'left',
        margin: '30px 0',
        padding: '0 24px',

        '.btn-admin': {
            width: '100%',
        },
    },
}));

const Navbar = ({ width }) => {

    // 登出
    const handleLogout = () => {

        alert('你將被登出');
        redirect('/');

    };

    return (

        <SiderLayout width={width}>
            <nav className="menu-wrap">
                {
                    navbrItem.map(({ name, pageKey }, idx) => (

                        <NavLink
                            key={idx}
                            to={pageKey}
                            className={({ isActive }) => isActive ? 'active' : ''}
                            {...(idx === 0) && { end: true }}
                        >
                            {name}
                        </NavLink>

                    ))
                }
            </nav>

            <div className="menu-logout">
                <Buttons
                    text="點我登出"
                    onClick={handleLogout}
                />
            </div>
        </SiderLayout>

    );

};

Navbar.defaultProps = {
    width: 200,
};

Navbar.propTypes = {
    width: PropTypes.number,
};

export default Navbar;
