import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LoadingLayout = styled.div({
    textAlign: 'center',
});

// Loading spin
const antIcon = (

    <LoadingOutlined
        spin
        style={{
            fontSize: 32,
        }}
    />

);

//
const Loading = ({ spin }) => (

    <LoadingLayout>
        <Spin
            spinning={spin}
            indicator={antIcon}
        />
    </LoadingLayout>

);

Loading.defaultProps = {
    spin: true,
};

Loading.propTypes = {
    spin: PropTypes.bool,
};

export default Loading;
