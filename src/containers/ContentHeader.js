import { useEffect } from 'react';
import PropTypes from 'prop-types';

const ContentHeader = ({ title }) => {

    useEffect(() => {

        document.title = `後台${title && `-${title}`}`;

    }, [title]);

    return <h1>{title}</h1>;

};

ContentHeader.defaultProps = {
    title: '',
};

ContentHeader.propTypes = {
    title: PropTypes.string.isRequired,
};

export default ContentHeader;
