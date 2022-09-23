import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Links = ({ url, newPage, className, children, ...rest }) => (

    <Link
        to={url}
        className={className}
        {...newPage && { target: '_blank'}}
        {...rest}
    >
        {children}
    </Link>

);

Links.defaultProps = {
    newPage: false,
};

Links.propTypes = {
    url: PropTypes.string.isRequired,
    newPage: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.any,
};

export default Links;
