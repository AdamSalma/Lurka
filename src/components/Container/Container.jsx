import React, { PropTypes } from 'react';
import cx from 'classnames';

import './Container.styles';

const Container = ({ className, children, padding }) => {
    return (
        <div className={cx('Container', className)} styles={{padding}}>
            {children}
        </div>
    );
};

Container.displayName = 'Container';

Container.propTypes = {
    className: PropTypes.string,
};

Container.defaultProps = {
    padding: "60px 15px 0"
}

export default Container;
